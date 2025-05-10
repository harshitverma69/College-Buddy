import React from 'react';
// Navbar is now global in App.jsx, no need to import or render here
import StudyTipsSection from '@/components/StudyTipsSection';
const StudyTips = () => {
    return (<div className="min-h-screen"> {/* This div might need adjustment if StudyTipsSection has its own full-page background */}
      {/* <Navbar /> */} {/* Removed redundant Navbar */}
      <StudyTipsSection />
    </div>);
};
export default StudyTips;
