'use client';
import React, { useState, useEffect, FormEventHandler } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { User } from '@/services/userService';

interface CreateEditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSave: (user: Partial<User>) => void;
    estados: string[];
    sectores: number[];
}

interface FormErrors {
    usuario?: string;
    estado?: string;
    sector?: string;
}

const CreateEditUserModal: React.FC<CreateEditUserModalProps> = ({
    isOpen, onClose, user, onSave, estados, sectores
}) => {
    const [formData, setFormData] = useState<Partial<User>>({
        usuario: '',
        estado: '',
        sector: undefined,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                usuario: '',
                estado: '',
                sector: undefined,
            });
        }
        setErrors({});
    }, [user]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.usuario) {
            newErrors.usuario = 'El nombre de usuario es requerido';
        } else if (formData.usuario.length < 3) {
            newErrors.usuario = 'El nombre de usuario debe tener al menos 3 caracteres';
        }
        if (!formData.estado) {
            newErrors.estado = 'El estado es requerido';
        }
        if (!formData.sector) {
            newErrors.sector = 'El sector es requerido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <Dialog
            header={user ? "Editar Usuario" : "Usuario"}
            visible={isOpen}
            onHide={onClose}
        >
            <form onSubmit={handleSubmit} className='h-full p-3 flex flex-column justify-content-between'>
                <div className="p-fluid">
                    <div className="p-field mb-4">
                        <label htmlFor="usuario" className='text-primary-gray font-semibold text-lg'>Nombre de Usuario</label>
                        <InputText
                            id="usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleInputChange}
                            className={classNames('mt-3 h-3rem align-items-center px-2', { 'p-invalid': errors.usuario })}
                            placeholder='Ingrese el nombre del usuario'
                        />
                        {errors.usuario && <small className="p-error">{errors.usuario}</small>}
                    </div>
                    <div className="p-field mb-4">
                        <label htmlFor="estado" className='text-primary-gray font-semibold text-lg'>Estado</label>
                        <div className='flex align-items-center border-round-lg w-full p-dropdown p-component p-inputwrapper mt-3 mb-4 h-3rem'>
                            <i className="pi pi-search pl-3" />
                            <Dropdown
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                options={estados}
                                onChange={handleDropdownChange}
                                placeholder="Seleccione un estado"
                                className={classNames('border-round-lg py-2 px-2 w-full border-none shadow-none', { 'p-invalid': errors.estado })}
                            />
                        </div>
                        {errors.estado && <small className="p-error">{errors.estado}</small>}
                    </div>
                    <div className="p-field mb-4">
                        <label htmlFor="sector" className='text-primary-gray font-semibold text-lg'>Sector</label>
                        <div className='flex align-items-center border-round-lg w-full p-dropdown p-component p-inputwrapper mt-3 mb-4 h-3rem'>
                            <i className="pi pi-search pl-3" />
                            <Dropdown
                                id="sector"
                                name="sector"
                                value={formData.sector}
                                options={sectores}
                                onChange={handleDropdownChange}
                                placeholder="Seleccione un sector"
                                className={classNames('border-round-lg py-2 px-2 w-full border-none shadow-none', { 'p-invalid': errors.sector })}
                            />
                        </div>
                        {errors.sector && <small className="p-error">{errors.sector}</small>}
                    </div>
                </div>
                <div className="p-dialog-footer flex gap-2 align-items-center justify-content-center">
                    <Button label="Confirmar" icon="pi pi-check" type="submit" autoFocus className='bg-primary-blue-200 p-3 gap-2' />
                    <Button label="Cancelar" icon="pi pi-times" onClick={onClose} className="p-button-text p-3 gap-2 border-blue text-primary-blue-100" />
                </div>
            </form>
        </Dialog>
    );
};

export default CreateEditUserModal;