import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/custom.css';
import { useSettings } from '../contexts/SettingsContext';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { t } = useSettings();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setCollapsed(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { path: '/', label:  `🏠 ${t('home')}` },
    { path: '/notes', label: `📝 ${t('notes')}` },
    { path: '/settings', label: `⚙️ ${t('settings')}` },
    { path: '/trash', label: `🗑️ ${t('trash')}` },
  ];

  return (
    <>
      {isMobile && (
        <div className="mobile-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </div>
      )}

      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        {!collapsed && <h4 className="mb-4 mx-5 gradient-text"><Link to="/"><strong>🧠 Second Brain</strong></Link></h4>}

        <Nav className="flex-column gap-2">
          {navLinks.map(({ path, label }) => (
            <Nav.Link
              as={Link}
              key={path}
              to={path}
              className={`sidebar-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => isMobile && setCollapsed(true)}
              title={collapsed ? label.split(' ')[1] : ''}
            >
              {collapsed ? label.split(' ')[0] : label}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;




