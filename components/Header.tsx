
import React from 'react';

const DolphinIcon: React.FC = () => (
    <div className="w-40 h-38">
      <img src="https://cdn.freelogovectors.net/wp-content/uploads/2024/02/miamidolphins_logo-freelogovectors.net_-640x474.png" />
    </div>
);


export const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-row">
      <DolphinIcon />
      <div className="flex flex-grow basis-0 justify-center items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FC4C02] to-[#008E97]">
          Fan Photo Editor
        </h1>
      </div>
    </header>
  );
};
