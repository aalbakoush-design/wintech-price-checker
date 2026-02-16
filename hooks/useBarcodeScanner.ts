import { useEffect, useState, useRef } from 'react';

/**
 * Listens for keyboard input. Barcode scanners usually emulate a keyboard.
 * They type characters very fast and end with an 'Enter' key.
 */
export const useBarcodeScanner = (onScan: (barcode: string) => void) => {
  const buffer = useRef<string>('');
  const lastKeyTime = useRef<number>(0);

  // Function to generate a simple beep sound using AudioContext
  const playBeep = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(1200, ctx.currentTime); // Frequency in Hz
      osc.type = 'square';
      gain.gain.setValueAtTime(0.1, ctx.currentTime); // Volume

      osc.start();
      osc.stop(ctx.currentTime + 0.1); // Play for 100ms
    } catch (e) {
      console.error("Failed to play beep", e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentTime = Date.now();
      
      // If time between keystrokes is too long, assume it's manual typing or interference, reset buffer
      // Scanners usually send keys within 20-50ms of each other.
      // We'll be generous with 100ms to support older devices/scanners.
      if (currentTime - lastKeyTime.current > 100) {
        buffer.current = '';
      }
      lastKeyTime.current = currentTime;

      if (e.key === 'Enter') {
        if (buffer.current.length > 0) {
          playBeep(); // Play beep sound
          onScan(buffer.current);
          buffer.current = '';
        }
      } else if (e.key.length === 1) {
        // Only append printable characters
        buffer.current += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onScan]);
};