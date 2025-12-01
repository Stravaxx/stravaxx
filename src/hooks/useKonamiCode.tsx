import { useEffect, useState } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const INVERSE_KONAMI = ['a', 'b', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp'];

export function useKonamiCode() {
  const [hackerMode, setHackerMode] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key].slice(-10);
      setKeySequence(newSequence);

      // Check for Konami code (enable hacker mode)
      if (newSequence.join(',') === KONAMI_CODE.join(',')) {
        setHackerMode(true);
        setKeySequence([]);
        
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = '🔓 HACKER MODE ACTIVATED';
        notification.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #00ff00, #00cc00);
          color: black;
          padding: 20px 40px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 24px;
          z-index: 10000;
          box-shadow: 0 0 50px rgba(0, 255, 0, 0.5);
          animation: pulse 0.5s ease-in-out;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
      }

      // Check for inverse Konami code (disable hacker mode)
      if (newSequence.join(',') === INVERSE_KONAMI.join(',')) {
        setHackerMode(false);
        setKeySequence([]);
        
        // Show notification
        const notification = document.createElement('div');
        notification.textContent = '🔒 HACKER MODE DESACTIVATED';
        notification.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #ff0000, #cc0000);
          color: white;
          padding: 20px 40px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 24px;
          z-index: 10000;
          box-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  return hackerMode;
}
