'use client';
import React, { useState, useCallback, useEffect, Suspense } from 'react';
import useSWR from 'swr';
import { User, fetchUsers, deleteUser, createUser, updateUser, fetchAllOptions } from '@/services/userService';
import Header from './Header';
import Filters from './Filters';
import UserList from './UserList';
import CreateEditUserModal from './CreateEditUserModal';
import SideBar from './SideBar';
import LoadingSpinner from './LoadingSpinner';

const UserManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentFilters, setCurrentFilters] = useState({ search: '', status: '', sector: '' });
    const [allEstados, setAllEstados] = useState<string[]>([]);
    const [allSectores, setAllSectores] = useState<number[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);

    const fetcher = useCallback(() => {
        const { search, status, sector } = currentFilters;
        return fetchUsers(
            1,
            1000000,
            search || undefined,
            status === 'TODOS' ? undefined : status,
            sector === 'TODOS' ? undefined : sector
        );
    }, [currentFilters]);
    const { data, error, mutate } = useSWR('users', fetcher);

    useEffect(() => {
        setIsLoadingOptions(true);
        fetchAllOptions()
            .then(({ estados, sectores }) => {
                setAllEstados(estados);
                setAllSectores(sectores);
            })
            .catch(error => {
                console.error('Error en fetching:', error);
                setAllEstados(['Activo', 'Inactivo']);
                setAllSectores([1, 2, 3]);
            })
            .finally(() => {
                setIsLoadingOptions(false);
            });
    }, []);

    const handleSearch = useCallback((value: string) => {
        setCurrentFilters(prev => ({ ...prev, search: value }));
    }, []);

    const handleStatusChange = useCallback((value: string) => {
        setCurrentFilters(prev => ({ ...prev, status: value }));
    }, []);

    const handleSectorChange = useCallback((value: string) => {
        setCurrentFilters(prev => ({ ...prev, sector: value }));
    }, []);

    const applyFilters = useCallback(() => {
        mutate();
    }, [mutate]);

    const handleDeleteUser = async (user: User) => {
        try {
            await deleteUser(user.id);
            mutate();
        } catch (error) {
            console.error('Error eliminando usuario:', error);
        }
    };

    const handleSaveUser = async (user: Partial<User>) => {
        try {
            if (user.id) {
                await updateUser(user as User);
            } else {
                await createUser(user as Omit<User, 'id'>);
            }
            setIsModalOpen(false);
            mutate();
        } catch (error) {
            console.error('Error guardando usuario:', error);
        }
    };

    const handleOpenModal = (user: User | null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    if (error) return <div>Error al cargar los usuarios</div>;
    if (!data) return <LoadingSpinner />;

    return (
        <>
            <div className='flex h-screen md:bg-white'>
                <div>
                    <SideBar />
                </div>
                <div className="card">
                    <Header title="Usuarios" onNewUser={() => handleOpenModal(null)} />
                    <Filters
                        onSearch={handleSearch}
                        onStatusChange={handleStatusChange}
                        onSectorChange={handleSectorChange}
                        onApplyFilters={applyFilters}
                        estados={['TODOS', ...allEstados]}
                        sectores={['TODOS', ...allSectores.map(String)]}
                        currentFilters={currentFilters}
                    />
                    <Suspense fallback={<LoadingSpinner />}>
                        <UserList
                            users={data.users}
                            onEdit={handleOpenModal}
                            onDelete={handleDeleteUser}
                        />
                    </Suspense>
                    <CreateEditUserModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        user={selectedUser}
                        onSave={handleSaveUser}
                        estados={data.estados}
                        sectores={data.sectores}
                    />
                </div>
            </div>
        </>
    );
};

export default UserManagement;