import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Splash from './pages/Splash';
import Home from './pages/Home';
import ProductResult from './pages/ProductResult';
import Settings from './pages/Settings';
import { useBarcodeScanner } from './hooks/useBarcodeScanner';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  // Global scanner listener
  useBarcodeScanner((barcode) => {
    if (!showSplash) {
      // Check if we are already in settings or product page to decide navigation logic?
      // Usually, in a kiosk, a scan ALWAYS takes you to the product page unless in deep settings.
      // However, typing in settings inputs might trigger this if not careful.
      // But standard scanners end with 'Enter', which submits forms.
      // We will assume scanning overrides everything for now, 
      // but let's prevent it if URL includes 'settings' to avoid messing up configuration.
      
      const isSettings = window.location.hash.includes('settings');
      if (!isSettings) {
        navigate(`/product/${barcode}`);
      }
    }
  });

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:barcode" element={<ProductResult />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <AppContent />
      </Router>
    </SettingsProvider>
  );
};

export default App;