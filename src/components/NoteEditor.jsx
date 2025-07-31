import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/custom.css'; // For custom tweaks like gradients, shadows, etc.

const NoteEditor = ({ note, onSave, onCancel }) => {
    const [title, setTitle] = useState(note.title || '');
    const [content, setContent] = useState(note.content || '');
    const [tags, setTags] = useState(note.tags ? note.tags.join(', ') : '');
  
    useEffect(() => {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags(note.tags ? note.tags.join(', ') : '');
    }, [note]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      onSave({ ...note, title, content, tags: tagArray });
    };
  
    return (
      <Card className="note-editor p-4 shadow-sm rounded-4 border-0">
        <Form onSubmit={handleSubmit}>
          <h4 className="mb-4 gradient-text fw-bold">📝 Edit Note</h4>
  
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Project Ideas"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="rounded-3"
            />
          </Form.Group>
  
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Write your note here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="rounded-3"
            />
          </Form.Group>
  
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. ideas, work, project"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="rounded-3"
            />
            <Form.Text muted>Separate tags with commas</Form.Text>
          </Form.Group>
  
          <div className="d-flex gap-3 justify-content-end">
            <Button variant="success" type="submit" className="px-4 rounded-3">
              Save
            </Button>
            <Button variant="outline-secondary" onClick={onCancel} className="px-4 rounded-3">
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    );
  };
  
  export default NoteEditor;

