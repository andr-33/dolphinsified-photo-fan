
import React from 'react';
import { Loader } from './Loader';

interface ImageDisplayProps {
  label: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ label, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3 text-[#008E97]">{label}</h3>
      <div className="w-full aspect-square bg-black/20 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-contain" />
        ) : (
          <div className="text-gray-400">Your image will appear here</div>
        )}
      </div>
    </div>
  );
};
