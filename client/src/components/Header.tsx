'use client';
import React from 'react';
import { Button } from 'primereact/button';

interface HeaderProps {
    title: string;
    onNewUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onNewUser }) => {
    return (
        <div className="flex justify-content-between align-items-center mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Button label="Nuevo Usuario" icon="pi pi-plus text-sm" onClick={onNewUser} className='bg-primary-blue-100 border-round-lg py-3 px-4 max-w-12rem w-full'/>
        </div>
    );
};

export default Header;