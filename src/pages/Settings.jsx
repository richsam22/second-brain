import React from 'react';
import { Card, Form, Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';



const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    fontSize, setFontSize,
    exportFormat, setExportFormat,
    sortPreference, setSortPreference,
    language, setLanguage,
    resetSettings
  } = useSettings();

  const handleReset = () => {
    if (window.confirm(t('resetConfirm'))) {
      resetSettings();
      if (theme !== 'light') toggleTheme(); // Reset theme
    }
  };

  const { t } = useSettings();

  return (
    <Container className="mt-4">
      <h2 className="mb-4 gradient-text">{t('settings')}</h2>
      <Row className="gy-4">
        {/* Theme */}
        <Col md={6}>
          <Card className="shadow-sm p-3 rounded-4">
            <h5>{t('theme')}</h5>
            <Form.Check
              type="switch"
              id="theme-toggle"
              label={theme === 'light' ? t('lightMode') : t('darkMode')}
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </Card>
        </Col>

        {/* Font Size */}
        <Col md={6}>
          <Card className="shadow-sm p-3 rounded-4">
            <h5>{t('fontSize')}</h5>
            <Form.Select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              <option value="small">{t('small')}</option>
              <option value="medium">{t('medium')} ({t('default')})</option>
              <option value="large">{t('large')}</option>
            </Form.Select>
          </Card>
        </Col>

        {/* Export Format */}
        <Col md={6}>
          <Card className="shadow-sm p-3 rounded-4">
            <h5>{t('exportFormat')}</h5>
            <Form.Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <option value="txt">Plain Text (.txt)</option>
              <option value="md">Markdown (.md)</option>
              <option value="pdf">PDF (.pdf)</option>
            </Form.Select>
          </Card>
        </Col>

        {/* Sort Preference */}
        <Col md={6}>
          <Card className="shadow-sm p-3 rounded-4">
            <h5>{t('sortPreference')}</h5>
            <Form.Select value={sortPreference} onChange={(e) => setSortPreference(e.target.value)}>
              <option value="newest">{t('newestFirst')}</option>
              <option value="oldest">{t('oldestFirst')}</option>
              <option value="alphabetical">{t('alphabetical')}</option>
            </Form.Select>
          </Card>
        </Col>

        {/* Language */}
        <Col md={6}>
          <Card className="shadow-sm p-3 rounded-4">
            <h5>{t('language')}</h5>
            <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              {/* Add more if needed */}
            </Form.Select>
          </Card>
        </Col>

        {/* Reset */}
        <Col md={12}>
          <Card className="shadow-sm p-3 rounded-4 text-center">
            <h5>{t('resetSettings')}</h5>
            <Button variant="danger" onClick={handleReset}>{t('resetButton')}</Button>
          </Card>
        </Col>
      </Row>

      <hr className="my-4" />

      <Card className="shadow-sm p-3 rounded-4 text-center">
      <Nav.Link as={Link} to="/about">{t('about')}</Nav.Link>
      </Card>



    </Container>
  );
};

export default Settings;




