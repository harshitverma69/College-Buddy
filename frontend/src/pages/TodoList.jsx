import React from 'react';
// Navbar is now global in App.jsx
import TodoSection from '@/components/TodoSection';
const TodoList = () => {
    return (<div className="min-h-screen"> {/* Removed background gradient */}
      {/* <Navbar /> */} {/* Removed redundant Navbar */}
      <TodoSection />
    </div>);
};
export default TodoList;
