import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useSettings } from '../contexts/SettingsContext';
import '../styles/custom.css';

const Home = () => {
  const [notes] = useNotes();
  const { t } = useSettings();

  const pinnedNotes = notes.filter(note => note.pinned);
  const recentNotes = [...notes]
    .filter(n => !n.trashed)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 3);

  const tips = [
    "📎 Organize notes with tags to find them faster.",
    "🧠 Use AI to summarize long ideas.",
    "📌 Pin important thoughts for quick access.",
    "🗑️ Review your trash weekly for forgotten gems.",
    "✍️ Start your day with a daily journal note."
  ];
  const tipOfTheDay = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="p-4 home-screen">
      <h2 className="mb-3 fw-bold">🧠 {t('welcome')}</h2>
      <p className="text-muted mb-4 fst-italic">{tipOfTheDay}</p>

      <section className="mb-5">
        <h4 className="section-title">📌 {t('pinned')} {t('notes')}</h4>
        {pinnedNotes.length === 0 ? (
          <p className="text-muted">{t('no')} {t('pinned')} {t('notes')} {t('yet')}.</p>
        ) : (
          <Row xs={1} md={2} lg={3}>
            {pinnedNotes.map(note => (
              <Col key={note.id} className="mb-3">
                <Card className="note-card shadow-sm">
                  <div className="note-header pinned-gradient" />
                  <Card.Body>
                    <Card.Title>{note.title || "Untitled"}</Card.Title>
                    <Card.Text>{note.content.slice(0, 100)}...</Card.Text>
                    <Link to="/notes" className="btn btn-sm btn-outline-primary">{t('openNote')}</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      <section className="mb-5">
        <h4 className="section-title">🕑 {t('recent')} {t('notes')}</h4>
        {recentNotes.length === 0 ? (
          <p className="text-muted">{t('no')} {t('recent')} {t('notes')} {t('yet')}.</p>
        ) : (
          <Row xs={1} md={2} lg={3}>
            {recentNotes.map(note => (
              <Col key={note.id} className="mb-3">
                <Link to="/notes" className=" text-decoration-none">
                <Card className="note-card shadow-sm">
                  <div className="note-header recent-gradient" />
                  <Card.Body>
                    <Card.Title>{note.title.slice(0, 40) || "Untitled"}...</Card.Title>
                    <Card.Text>{note.content.slice(0, 100)}...</Card.Text>
                  </Card.Body>
                </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </section>

      <section>
        <h4 className="section-title">🚀 {t('quickAction')}</h4>
        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to="/notes" variant="primary">📄 {t('viewNote')}</Button>
          <Button as={Link} to="/trash" variant="outline-danger">🗑️ {t('trash')}</Button>
          <Button as={Link} to="/settings" variant="outline-secondary">⚙️ {t('settings')}</Button>
        </div>
      </section>
    </div>
  );
};

export default Home;


