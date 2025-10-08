import React from 'react';

interface ImageDisplayProps {
  label?: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ label, imageUrl, isLoading }) => {
  return (
    <div className="flex flex-col items-center">
      {label && <span className="mb-2 text-gray-200 font-medium">{label}</span>}

      <div className="relative w-full max-w-sm bg-white p-4 rounded-xl shadow-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <span className="text-white font-bold">Loading...</span>
          </div>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label || 'Image'}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
    </div>
  );
};
