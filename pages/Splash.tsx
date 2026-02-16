import React, { useEffect } from 'react';
import { Logo } from '../components/Logo';
import { useSettings } from '../context/SettingsContext';

interface SplashProps {
  onComplete: () => void;
}

const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const { settings } = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-pulse flex flex-col items-center justify-center w-full h-full p-8">
        {settings.splashImageUrl ? (
            <img 
                src={settings.splashImageUrl} 
                alt="Splash Logo" 
                className="max-w-full max-h-[60vh] object-contain drop-shadow-xl"
            />
        ) : (
            <Logo size="xl" />
        )}
        
        <p className="text-center mt-8 text-gray-500 font-semibold text-lg">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
};

export default Splash;