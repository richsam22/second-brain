import React, { useState } from 'react';
import { Button, Card, Badge, Spinner } from 'react-bootstrap';
import { exportNote } from '../utils/exportNote';
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

  const { fontSize, t } = useSettings();
  const [expandedNoteIds, setExpandedNoteIds] = useState([]);

  const isNoteExpanded = (id) => expandedNoteIds.includes(id);

  const toggleContent = (id) => {
    setExpandedNoteIds(prev =>
      prev.includes(id) ? prev.filter(nid => nid !== id) : [...prev, id]
    );
  };

  const fontSizeStyle = {
    fontSize:
      fontSize === 'small' ? '14px' :
      fontSize === 'large' ? '20px' : '16px',
  };

  if (!notes.length) return <p>No notes found.</p>;

  const renderNoteCard = (note) => {
    const isExpanded = isNoteExpanded(note.id);
    const safeContent = note.content || '';
    const contentToDisplay = isExpanded
      ? safeContent
      : safeContent.length > 200
        ? safeContent.slice(0, 200) + '...'
        : safeContent;

    return (
      <Card key={note.id} className="note-card shadow-sm border-0">
        <div className={`note-card-header ${note.pinned ? 'bg-warning' : 'bg-light'}`}></div>
        <Card.Body className="position-relative">
          <Card.Title className="fw-bold d-flex justify-content-center">
            {note.title || 'Untitled Note'}
            {note.pinned && <span className="text-warning fs-6">📌</span>}
          </Card.Title>

          <Card.Text
            className="text-muted justify-content-center text-center"
            style={{
              whiteSpace: 'pre-wrap',
              transition: 'all 0.3s ease',
              cursor: safeContent.length > 200 ? 'pointer' : 'default',
              ...fontSizeStyle
            }}
            onClick={() => {
              if (safeContent.length > 200) toggleContent(note.id);
            }}
          >
            {contentToDisplay}
          </Card.Text>

          {safeContent.length > 200 && (
            <div className="text-center mb-2">
              <Button
                variant="link"
                size="sm"
                onClick={() => toggleContent(note.id)}
                className="p-0 text-primary"
              >
                {isExpanded ? t('showLess') || 'Show Less' : t('readMore') || 'Read More'}
              </Button>
            </div>
          )}

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
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(note)}>
              ✏️ {t('edit')}
            </Button>

            {showRestoreButtons ? (
              <>
                <Button onClick={() => onRestore(note.id)} className="btn btn-success btn-sm me-2">
                  {t('restore')}
                </Button>
                <Button onClick={() => onDeleteForever(note.id)} className="btn btn-danger btn-sm">
                  {t('deletePermanently')}
                </Button>
              </>
            ) : (
              <Button onClick={() => onDelete(note.id)} variant="outline-danger" size="sm">
                🗑️ {t('delete')}
              </Button>
            )}

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onSummarize(note)}
              disabled={aiLoadingId === note.id && aiAction === 'summary'}
            >
              {aiLoadingId === note.id && aiAction === 'summary'
                ? <Spinner animation="border" size="sm" />
                : <span>🧠 {t('summarize')}</span>}
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onSuggestTitle(note)}
              disabled={aiLoadingId === note.id && aiAction === 'title'}
            >
              {aiLoadingId === note.id && aiAction === 'title'
                ? <Spinner animation="border" size="sm" />
                : <span>💡{t('suggestTitle')}</span>}
            </Button>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => onSuggestTags(note)}
              disabled={aiLoadingId === note.id && aiAction === 'tags'}
            >
              {aiLoadingId === note.id && aiAction === 'tags'
                ? <Spinner animation="border" size="sm" />
                : <span>🧩{t('tags')}</span>}
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
            {t('created')}: {new Date(note.createdAt).toLocaleString()} |{' '}
            {t('lastEdited')}: {new Date(note.updatedAt).toLocaleString()}
          </small>
        </Card.Body>
      </Card>
    );
  };

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

