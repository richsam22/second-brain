import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'second-brain-notes';

export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    // ✅ Load once on mount — safe lazy load
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse notes from localStorage', e);
      return [];
    }
  });

  // ✅ Save to localStorage every time notes change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [notes]);

  return [notes, setNotes];
};

