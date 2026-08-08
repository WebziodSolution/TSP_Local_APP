import React, { useRef } from 'react';
import CustomIcons from '../icons/CustomIcons';

export default function FileInputBox({ onFileSelect, value, onRemove, text }) {
    const handleFileChange = (e) => {
        if (onFileSelect && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="w-full h-40">
            {value ? (
                <div className="relative w-full h-full border border-dashed border-gray-400 rounded-lg overflow-hidden">
                    <img
                        src={value}
                        alt="Uploaded preview"
                        className="w-full h-full object-contain"
                    />
                    <div className='absolute top-2 right-2 h-6 w-6 flex justify-center items-center rounded-full border border-red-500 bg-red-500 z-10'>
                        <button onClick={onRemove}>
                            <CustomIcons iconName={'fa-solid fa-xmark'} css='cursor-pointer text-white' />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className="relative w-full h-full border border-dashed border-gray-400 rounded-lg bg-white p-10 cursor-pointer hover:border-blue-400 transition flex flex-col items-center justify-center"
                >
                    <div className="flex flex-col items-center justify-center text-gray-500 pointer-events-none">
                        <CustomIcons iconName="fa-solid fa-image" css="w-8 h-8 mb-3" />
                        <p className="text-center text-sm">
                            {text ? text : 'Click in this area to upload a file'}
                        </p>
                    </div>
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/jpg, image/png, image/jpeg, image/JPG, image/PNG, image/JPEG"
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </div>
    );
}
