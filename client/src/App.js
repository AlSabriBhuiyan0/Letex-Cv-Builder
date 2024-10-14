import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import Commands from './components/Commands';
import "./index.css"; // This should contain the Tailwind directives
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="p-4 text-white bg-blue-600">
          <div className="container flex justify-between items-center mx-auto">
            <h1 className="text-2xl font-bold">LaTeX CV Builder</h1>
            <nav>
              <Link to="/" className="mr-4 hover:underline">Home</Link>
              <Link to="/commands" className="hover:underline">Commands</Link>
            </nav>
          </div>
        </header>
        <main className="container p-4 mx-auto mt-8">
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
