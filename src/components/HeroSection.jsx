import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Restored Button import if it was used before Launch Buddy Mode removal
import { Lightbulb, BookOpen, Bell, ListTodo } from 'lucide-react';

const HeroSection = () => {
    return (<div className="relative overflow-hidden"> {/* Removed min-h-screen and specific background div from UI illustration step */}
      {/* Global background from App.jsx will apply here */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left column with mascot - perfectly round and filled */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
              {/* Updated to make the mascot image perfectly fill the circle */}
              <div className="rounded-full overflow-hidden border-4 border-buddy-lavender shadow-lg w-full h-full">
                <img src="/college_buddy_mascot.png?v=2" alt="College Buddy Mascot" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
          
          {/* Right column with text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800 font-outfit">
              Your College Life, <span className="text-buddy-lavender">Sorted.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-lg mx-auto lg:mx-0">
              Get latest PYQs, notes & resources — plus genius ways to bunk class.
            </p>
            
            {/* Launch Buddy Mode Button Removed (this was a previous step, keeping it removed) */}
            
            {/* Features section */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <Link to="/study-tips" className="feature-card block">
                <div className="flex items-center mb-2">
                  <Lightbulb size={20} className="text-buddy-lavender mr-2"/>
                  <h3 className="font-semibold">Study Help</h3>
                </div>
                <p className="text-sm text-gray-600">AI-powered learning assistance</p>
              </Link>
              
              <Link to="/bunk-classes" className="feature-card block">
                <div className="flex items-center mb-2">
                  <Bell size={20} className="text-buddy-yellow mr-2"/>
                  <h3 className="font-semibold">Bunking Tips</h3>
                </div>
                <p className="text-sm text-gray-600">Smart ways to manage attendance</p>
              </Link>
              
              <Link to="/todo" className="feature-card block">
                <div className="flex items-center mb-2">
                  <ListTodo size={20} className="text-buddy-green mr-2"/>
                  <h3 className="font-semibold">To-Do List</h3>
                </div>
                <p className="text-sm text-gray-600">Track assignments & deadlines</p>
              </Link>
              
              <Link to="/notes" className="feature-card block">
                <div className="flex items-center mb-2">
                  <BookOpen size={20} className="text-buddy-peach mr-2"/>
                  <h3 className="font-semibold">Notes Library</h3>
                </div>
                <p className="text-sm text-gray-600">Access community study material</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decoration REMOVED */}
    </div>);
};
export default HeroSection;
