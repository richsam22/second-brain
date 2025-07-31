import React from 'react';
import { Button, Card, Badge, Spinner, Form } from 'react-bootstrap';
import { exportNote } from '../utils/exportNote';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSettings } from '../contexts/SettingsContext';



const NoteList = ({
  notes,
  onEdit,
  onRestore,
  onDelete,
  onDeleteForever,
  onTagClick,
  onSummarize,
  onSuggestTitle,
  onSuggestTags,
  onTogglePin,
  aiLoadingId,
  aiAction,
  showRestoreButtons = false
}) => {
  const pinnedNotes = notes.filter(note => note.pinned);
  const otherNotes = notes.filter(note => !note.pinned);

  const [exportFormat, setExportFormat] = useState('txt');
  const { fontSize, t } = useSettings();


  const fontSizeStyle = {
    fontSize:
      fontSize === 'small'
        ? '14px'
        : fontSize === 'large'
        ? '20px'
        : '16px',
  };
  
  


  if (!notes.length) return <p>No notes found.</p>;

  const renderNoteCard = note => (
    <Card key={note.id} className="note-card shadow-sm border-0">
  <div className={`note-card-header ${note.pinned ? 'bg-warning' : 'bg-light'}`}></div>
  <Card.Body className="position-relative">
    <Card.Title className="fw-bold d-flex justify-content-center">
      {note.title || 'Untitled Note'}
      {note.pinned && <span className="text-warning fs-6">📌</span>}
    </Card.Title>

    <Card.Text
      className={`text-muted justify-content-center text-center`}
      style={{ whiteSpace: 'pre-wrap', ...fontSizeStyle }}
    >
      {note.content.length > 200
        ? note.content.slice(0, 200) + '...'
        : note.content}
    </Card.Text>


    {note.tags?.length > 0 && (
      <div className="mb-2 text-center">
        {note.tags.map(tag => (
          <Badge
            key={tag}
            className="me-2 custom-tag"
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>
    )}

        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(note)}
          >
            ✏️ {t('edit')}
          </Button>

          {showRestoreButtons ? (
            <>
                <button
                onClick={() => onRestore(note.id)}
                className="btn btn-success btn-sm me-2"
                >
                {t('restore')}
                </button>
                <button
                onClick={() => onDeleteForever(note.id)}
                className="btn btn-danger btn-sm"
                >
                {(t('deletePermanently'))}
                </button>
            </>
            ) : (
            <button
                onClick={() => onDelete(note.id)}
                className="btn btn-outline-danger btn-sm"
            >
               🗑️ {t('delete')}
            </button>
            )}


          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onSummarize(note)}
            disabled={aiLoadingId === note.id && aiAction === 'summary'}
          >
            {aiLoadingId === note.id && aiAction === 'summary' ? (
              <Spinner animation="border" size="sm" />
            ) : (
             <span>🧠 {t('summarize')}</span>
            )}
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onSuggestTitle(note)}
            disabled={aiLoadingId === note.id && aiAction === 'title'}
          >
            {aiLoadingId === note.id && aiAction === 'title' ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <span>💡{t('suggestTitle')}</span>
            )}
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onSuggestTags(note)}
            disabled={aiLoadingId === note.id && aiAction === 'tags'}
          >
            {aiLoadingId === note.id && aiAction === 'tags' ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <span>🧩{t('tags')}</span>
            )}
          </Button>

          <Button
            variant={note.pinned ? 'warning' : 'outline-secondary'}
            size="sm"
            onClick={() => onTogglePin(note.id)}
            className="mb-2"
          >
            {note.pinned ? <span>📌 {t('unpin')}</span> : <span>📍 {t('pin')}</span>}
          </Button>

          <DropdownButton
            variant="outline-secondary"
            size="sm"
            title={`📥 ${t('export')}`}
            className=""
          >
            <Dropdown.Item onClick={() => exportNote(note, 'txt')}>
              {t('export')} as .txt
            </Dropdown.Item>
            <Dropdown.Item onClick={() => exportNote(note, 'md')}>
            {t('export')} as .md
            </Dropdown.Item>
            <Dropdown.Item onClick={() => exportNote(note, 'pdf')}>
            {t('export')} as PDF
            </Dropdown.Item>
          </DropdownButton>
        </div>

        <small className="text-muted">
        {t('created')}: {new Date(note.createdAt).toLocaleString()} | 
        {t('lastEdited')}: {new Date(note.updatedAt).toLocaleString()}
      </small>
      </Card.Body>
    </Card>
  );

  return (
    <div className="d-grid gap-4">
      {pinnedNotes.length > 0 && (
        <>
          <h5 className="mt-2">📌 {t('pinned')}</h5>
          {pinnedNotes.map(renderNoteCard)}
        </>
      )}

      {otherNotes.length > 0 && (
        <>
          {pinnedNotes.length > 0 && <hr />}
          <h5 className="mt-2">🗒️ {t('other')}</h5>
          {otherNotes.map(renderNoteCard)}
        </>
      )}
    </div>
  );
};

export default NoteList;

