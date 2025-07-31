import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNotes } from '../hooks/useNotes';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import { useOpenAI } from '../hooks/useOpenAI';
import SearchBar from '../components/SearchBar';
import { useSettings } from '../contexts/SettingsContext';



const Notes = () => {
  const [notes, setNotes] = useNotes();
  const [editingNote, setEditingNote] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [aiLoadingId, setAiLoadingId] = useState(null);
  const [aiAction, setAiAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [tagResults, setTagResults] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const timestamp = new Date().toISOString();

  const { t } = useSettings();
 

  




  const { summarizeNote, sendPrompt, suggestTags } = useOpenAI();

  const filteredNotes = filterTag
    ? notes.filter(note => note.tags && note.tags.includes(filterTag))
    : notes;

  const searchedNotes = filteredNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
 
    // ✅ NEW: Exclude trashed notes here
  const visibleNotes = searchedNotes.filter(note => !note.trashed);
    
  // ✅ Sort pinned first
  const sortedNotes = [...visibleNotes].sort(
    (a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
  );


  const handleSummarize = async (note) => {
    setAiLoadingId(note.id);
    setAiAction('summary');
    try {
      const summary = await summarizeNote(note.content);
      setModalContent(`🧠 Summary:\n\n${summary}`);
      setShowModal(true);
    } catch (err) {
      console.error('Summarize error:', err);
      alert('AI failed to summarize. Try again later.');
    } finally {
      setAiLoadingId(null);
      setAiAction(null);
    }
  };

  const handleSuggestTitle = async (note) => {
    setAiLoadingId(note.id);
    setAiAction('title');
    try {
      const prompt = `Suggest a short, relevant title for this note:\n\n${note.content}`;
      const title = await sendPrompt(prompt, 'You generate creative but relevant note titles.');
      const newTitle = title.split('\n')[0].replace(/^["“”']|["“”']$/g, '');
      const updated = notes.map(n => n.id === note.id ? { ...n, title: newTitle } : n);
      setNotes(updated);
    } catch (err) {
      console.error('Suggest title error:', err);
      alert('AI failed to suggest a title. Try again later.');
    } finally {
      setAiLoadingId(null);
      setAiAction(null);
    }
  };

  const onSuggestTags = async (note) => {
    // console.log('Suggesting tags for note:', note);
    try {
      setAiLoadingId(note.id);
      setAiAction('tags');
      
      const suggested = await useOpenAI().suggestTags(note.text);  // Or useOpenAI().suggestTags
  
      console.log('Suggested Tags:', suggested);
  
      setTagResults(`Suggested Tags:\n${suggested}`);
      setShowTagsModal(true);
      // Or replace alert with a modal / toast (explained below)
  
      // Optionally, update the note with suggested tags
      // updateNote({ ...note, tags: suggested });
  
    } catch (error) {
      console.error('Tag suggestion error:', error);
      alert('Failed to suggest tags.');
    } finally {
      setAiLoadingId(null);
      setAiAction(null);
    }
  };

  const handleTogglePin = (id) => {
    const updated = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updated);
  };
  
  
  

  const handleSave = (note) => {
    if (note.id) {
      note.updatedAt = new Date().toISOString(); 
      // Update
      setNotes(prevNotes =>
        prevNotes.map(n => (n.id === note.id ? note : n))
      );
    } else {
      // Add
      note.id = Date.now();
      setNotes(prevNotes => [note, ...prevNotes]);
    }
    setEditingNote(null);
  };
  

  const handleDelete = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, trashed: true } : note
      )
    );
  };
  

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t('yourNote')}</h2>
        <Button onClick={() => setEditingNote({ title: '', content: '', tags: [], pinned: false, trashed: false, createdAt: timestamp, updatedAt: timestamp   })}>+ {t('newNote')}</Button>
      </div>

       {/* ✅ SearchBar */}
     <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {editingNote ? (
        <NoteEditor
          note={editingNote}
          onSave={handleSave}
          onCancel={() => setEditingNote(null)}
        />
      ) : (
        <>
          {filterTag && (
            <div className="mb-3">
              <span className="me-2">{t('filter')}: <strong>#{filterTag}</strong></span>
              <Button size="sm" variant="outline-secondary" onClick={() => setFilterTag(null)}>
                {t('clearFilter')}
              </Button>
            </div>
          )}
          <NoteList
            notes={sortedNotes}
            onEdit={setEditingNote}
            onDelete={handleDelete}
            onTagClick={setFilterTag}
            onSummarize={handleSummarize}
            onSuggestTitle={handleSuggestTitle}
            onSuggestTags={onSuggestTags}
            onTogglePin={handleTogglePin}
            aiLoadingId={aiLoadingId}
            aiAction={aiAction}
          />
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ whiteSpace: 'pre-wrap' }}>
                {modalContent}
            </Modal.Body>
          </Modal>

          <Modal show={showTagsModal} onHide={() => setShowTagsModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Suggested Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{tagResults}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => setShowTagsModal(false)}>
                Close
                </Button>
            </Modal.Footer>
          </Modal>

        </>
      )}
    </div>
  );
};

export default Notes;

