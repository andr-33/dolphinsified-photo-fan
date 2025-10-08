
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-[#F58220] border-t-transparent"></div>
      <p className="text-lg font-semibold text-white animate-pulse">Tua is cooking up your photo...</p>
    </div>
  );
};
