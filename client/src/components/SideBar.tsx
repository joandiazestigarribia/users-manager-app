import React from 'react'
import { Button } from 'primereact/button';

const SideBar = () => {
    return (
        <div className='bg-primary-gray-100 flex flex-column pt-4 gap-4 h-full w-auto align-items-center lg:w-4rem'>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
            <div>
                <Button
                    icon="pi pi-box text-2xl"
                    className="bg-primary-gray-100 border-none border-noround"
                />
            </div>
        </div>
    )
}

export default SideBar