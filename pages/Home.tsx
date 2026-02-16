import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { ScanBarcode, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white">
      
      {/* Video Background */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={settings.videoUrl}
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <h2 className="text-2xl text-gray-400">فيديو إعلاني (Video Unavailable)</h2>
        </div>
      )}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/30 z-10 flex flex-col items-center justify-center animate-fade-in">
        
        {/* Animated Scanner Graphic */}
        <div className="relative mb-12">
            <div className="w-64 h-64 border-4 border-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm bg-white/10 relative overflow-hidden shadow-2xl">
                <ScanBarcode size={120} className="text-white opacity-80" />
                
                {/* Scanning Beam Animation */}
                <div className="absolute top-0 left-0 w-full h-2 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 animate-bounce">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 animate-bounce">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-center mb-4 drop-shadow-lg tracking-wide">
          تفضل بمسح الباركود
        </h2>
        <p className="text-xl md:text-2xl font-light opacity-90">
          لمعرفة سعر المنتج
        </p>

      </div>

      {/* Hidden Settings Trigger (Bottom Right Corner Long Press or Click) */}
      <button 
        onClick={() => navigate('/settings')}
        className="absolute bottom-6 right-6 z-50 p-3 rounded-full bg-black/40 text-white/30 hover:bg-black/80 hover:text-white transition-all backdrop-blur-md border border-white/10"
      >
        <SettingsIcon size={24} />
      </button>

      {/* Add global styles for the scan animation */}
      <style>{`
        @keyframes scan {
            0%, 100% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            50% { top: 100%; opacity: 1; }
            90% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;