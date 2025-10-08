
import React from 'react';

const DolphinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F58220] mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5,9.5C16.5,12 14.5,14 12,14C9.5,14 7.5,12 7.5,9.5C7.5,7 9.5,5 12,5C14.5,5 16.5,7 16.5,9.5M12,16C10.6,16 9.2,16.4 8,17.2L9,19.2C9.4,19.7 10.2,20 10.8,20H13.2C13.8,20 14.6,19.7 15,19.2L16,17.2C14.8,16.4 13.4,16 12,16M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2Z" transform="scale(1,-1) translate(0,-24)"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-center p-4">
       <DolphinIcon />
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F58220] to-[#008E97]">
        Dolphins Fan Photo Editor
      </h1>
    </header>
  );
};
