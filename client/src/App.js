import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from './components/Home';
import Commands from './components/Commands';
import "./index.css"; // This should contain the Tailwind directives
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">LaTeX CV Builder</h1>
            <nav>
              <NavLink to="/" className={({ isActive }) => 
                isActive ? "mr-4 underline" : "mr-4 hover:underline"
              }>Home</NavLink>
              <NavLink to="/commands" className={({ isActive }) => 
                isActive ? "underline" : "hover:underline"
              }>Commands</NavLink>
            </nav>
          </div>
        </header>
        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
