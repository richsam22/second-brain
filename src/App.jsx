import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Trash from './pages/Trash';
import About from "./pages/About";
import { useNotes } from './hooks/useNotes'; // 👈 import your custom hook

const App = () => {
  const [notes, setNotes] = useNotes(); // 👈 load notes here once

  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes notes={notes} setNotes={setNotes} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/trash" element={<Trash key={notes.filter(note => note.trashed).length} notes={notes} setNotes={setNotes} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

