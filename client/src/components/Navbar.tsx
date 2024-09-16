import Image from 'next/image'
import React from 'react'
import { Button } from 'primereact/button';

const Navbar = () => {
    return (
        <div className='bg-primary-blue flex justify-content-between align-items-center h-4rem px-2'>
            <div>
                <Image
                    src="/iso-logo.svg"
                    width={44}
                    height={44}
                    alt='logo'
                />
            </div>
            <div>
            <Button
                icon="pi pi-cog text-2xl"
                className="bg-primary-blue border-none w-3rem h-3rem"
            />
            </div>
        </div>
    )
}

export default Navbar