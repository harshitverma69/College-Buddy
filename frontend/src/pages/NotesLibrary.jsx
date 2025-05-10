import React from 'react';
// Navbar is now global in App.jsx
import NotesSection from '@/components/NotesSection';
const NotesLibrary = () => {
    return (<div className="min-h-screen"> {/* Removed background gradient */}
      {/* <Navbar /> */} {/* Removed redundant Navbar */}
      <NotesSection />
    </div>);
};
export default NotesLibrary;
