'use client';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { User } from '../services/userService';

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <DataTable value={users} responsiveLayout="scroll">
            <Column field="id" header="ID" sortable></Column>
            <Column field="usuario" header="Usuario" sortable></Column>
            <Column field="estado" header="Estado" sortable></Column>
            <Column field="sector" header="Sector" sortable></Column>
        </DataTable>
    );
};

export default UserTable;