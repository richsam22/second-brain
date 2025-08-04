import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import { useSettings } from '../contexts/SettingsContext';

const Trash = ({ notes, setNotes }) => {
  const { t } = useSettings();

  const [trashedNotes, setTrashedNotes] = useState([]);

  // Update local state when notes change (even between pages)
  useEffect(() => {
    const filtered = notes.filter(note => note.trashed);
    setTrashedNotes(filtered);
  }, [notes]);

  

  const handleRestore = (id) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, trashed: false } : note
      )
    );
  };

  const handleDeleteForever = (id) => {
    if (window.confirm('Delete this note permanently?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  const handleEmptyTrash = () => {
    if (window.confirm('Are you sure you want to permanently delete all trashed notes?')) {
      setNotes(prev => prev.filter(note => !note.trashed));
    }
  };

  return (
    <div>
      <h4 className="mb-3">🗑️ {t('trash')}</h4>

      {trashedNotes.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={handleEmptyTrash}>
          {t('empty')} {t('trash')}
        </button>
      )}

      {trashedNotes.length === 0 ? (
        <p className="text-muted">{t('trash')} {t('is')} {t('empty')} 🧹</p>
      ) : (
        <NoteList
          notes={trashedNotes}
          onRestore={handleRestore}
          onDeleteForever={handleDeleteForever}
          showRestoreButtons={true}
        />
      )}
    </div>
  );
};

export default Trash;
