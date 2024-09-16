import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { User } from '@/services/userService';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    const userNameTemplate = (rowData: User) => {
        return (
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onEdit(rowData);
                }}
                className="text-primary-blue text-sm font-bold hover:underline"
            >
                {rowData.usuario}
            </a>
        );
    };

    const actionTemplate = (rowData: User) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger w-2rem h-2rem"
                onClick={() => onDelete(rowData)}
            />
        );
    };

    return (
        <DataTable value={users} paginator rows={10} totalRecords={users.length} rowsPerPageOptions={[10, 20, 30]}>
            <Column field="id" header="id" sortable />
            <Column field="usuario" header="Usuario" body={userNameTemplate} sortable />
            <Column field="estado" header="Estado" sortable />
            <Column field="sector" header="Sector" sortable />
            <Column body={actionTemplate} header="Eliminar Usuario" />
        </DataTable>
    );
};

export default UserList;