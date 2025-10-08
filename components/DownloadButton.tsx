import React from 'react';

interface DownloadButtonProps {
    imageUrl: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
    const handleDownload = () => {
        if (!imageUrl) return;

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'dolphins-fan-photo.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-[#008E97] hover:bg-teal-600 text-white font-bold text-lg py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
            Download Image
        </button>
    );
};