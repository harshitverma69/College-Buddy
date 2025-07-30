
import React from 'react';
// Navbar is now global in App.jsx
import BunkClassesSection from '@/components/BunkClassesSection';

const BunkClasses = () => {
  return (
    <div className="min-h-screen"> {/* Removed background gradient */}
      {/* <Navbar /> */} {/* Removed redundant Navbar */}
      <BunkClassesSection />
    </div>
  );
};

export default BunkClasses;
