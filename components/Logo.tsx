import React from 'react';
import { useSettings } from '../context/SettingsContext';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl', color?: string }> = ({ size = 'md', color }) => {
  const { settings } = useSettings();
  
  let widthClass = 'w-32';
  if (size === 'sm') widthClass = 'w-16';
  if (size === 'lg') widthClass = 'w-48';
  if (size === 'xl') widthClass = 'w-64';

  const finalColor = color || settings.primaryColor;

  return (
    <div className={`flex flex-col items-center justify-center ${widthClass} select-none`}>
       {/* Abstract Tech Icon Logo */}
      <svg viewBox="0 0 100 100" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z" stroke={finalColor} strokeWidth="8" strokeLinejoin="round"/>
         <circle cx="50" cy="50" r="15" fill={settings.secondaryColor} />
         <path d="M50 10 L50 35" stroke={finalColor} strokeWidth="6"/>
         <path d="M80 70 L58 58" stroke={finalColor} strokeWidth="6"/>
         <path d="M20 70 L42 58" stroke={finalColor} strokeWidth="6"/>
      </svg>
      <h1 className="mt-2 font-black text-center" style={{ color: finalColor, fontSize: size === 'sm' ? '0.8rem' : size === 'xl' ? '2.5rem' : '1.5rem' }}>
        {settings.companyName}
      </h1>
    </div>
  );
};