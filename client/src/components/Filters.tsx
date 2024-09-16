'use client';
import React, { useState, KeyboardEvent, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface FiltersProps {
    onSearch: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSectorChange: (value: string) => void;
    onApplyFilters: () => void;
    estados: string[];
    sectores: string[];
    currentFilters: {
        search: string;
        status: string;
        sector: string;
    };
}

const Filters: React.FC<FiltersProps> = ({
    onSearch,
    onStatusChange,
    onSectorChange,
    onApplyFilters,
    estados,
    sectores,
    currentFilters
}) => {
    const [searchValue, setSearchValue] = useState(currentFilters.search);
    const [selectedStatus, setSelectedStatus] = useState(currentFilters.status);
    const [selectedSector, setSelectedSector] = useState(currentFilters.sector);

    useEffect(() => {
        setSearchValue(currentFilters.search);
        setSelectedStatus(currentFilters.status);
        setSelectedSector(currentFilters.sector);
    }, [currentFilters]);

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        onSearch(value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onApplyFilters();
        }
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        onStatusChange(value);
    };

    const handleSectorChange = (value: string) => {
        setSelectedSector(value);
        onSectorChange(value);
    };

    return (
        <div className="flex justify-content-between align-items-center mb-4 border-color gap-2 flex-column lg:flex-row">
            <span className="p-input-icon-left w-full ">
                <i className="pi pi-search -mt-2 pl-3" />
                <InputText
                    placeholder="Buscar"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='border-round-lg py-2 pr-2 pl-5-5 w-full '
                />
            </span>
            <div className='flex align-items-center border-round-lg w-full p-dropdown p-component p-inputwrapper'>
                <i className="pi pi-search -mt-1 pl-3" />
                <Dropdown
                    options={estados}
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.value)}
                    placeholder="Seleccionar el Estado"
                    className='border-round-lg py-2 px-2 w-full border-none shadow-none'
                />
            </div>
            <div className='flex align-items-center border-round-lg w-full p-dropdown p-component p-inputwrapper'>
                <i className="pi pi-search -mt-1 pl-3" />
                <Dropdown
                    options={sectores}
                    value={selectedSector}
                    onChange={(e) => handleSectorChange(e.value)}
                    placeholder="Seleccionar el Sector"
                    className='border-round-lg py-2 px-2 w-full border-none shadow-none'
                />
            </div>
            <Button
                icon="pi pi-filter-fill text-sm"
                className="p-button-text border-round-lg bg-primary-gray text-white py-2 px-3 p-button p-component justify-content-between w-full max-w-10rem"
                onClick={onApplyFilters}
            >
                Aplicar Filtros
            </Button>
        </div>
    );
};

export default Filters;