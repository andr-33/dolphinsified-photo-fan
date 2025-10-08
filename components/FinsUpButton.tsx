
import React from 'react';

interface FinsUpButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const FinsUpButton: React.FC<FinsUpButtonProps> = ({ onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full sm:w-auto bg-[#F58220] hover:bg-orange-500 text-white font-bold text-lg py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
            Fins Up! Edit My Photo
        </button>
    );
};
