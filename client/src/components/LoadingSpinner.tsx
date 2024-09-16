import React from 'react';
import { Ellipsis } from 'react-css-spinners'

const LoadingSpinner: React.FC = () => {
    return (
        <div className='flex justify-content-center h-screen align-items-center'>
            <Ellipsis
                color="#0763E7"
                size={100}
            />
        </div>
    )
};

export default LoadingSpinner;