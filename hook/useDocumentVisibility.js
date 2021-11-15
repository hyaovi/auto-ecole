import { useState, useEffect } from 'react';

export function useDocumentVisibility() {
  const getDocVisibility = () => document.visibilityState === 'visible';
  const [visible, setVisible] = useState(getDocVisibility());
  useEffect(() => {
    const onTabLeave = (e) => {
      if (document.visibilityState === 'visible') {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    document.addEventListener('visibilitychange', onTabLeave);
    return () => {
      document.removeEventListener('visibilitychange', onTabLeave);
    };
  }, []);
  return visible;
}
