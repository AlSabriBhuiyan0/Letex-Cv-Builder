import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ResumeForm from './components/ResumeForm';
import "./index.css"; // This should contain the Tailwind directives
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="p-4 text-white bg-blue-600">
          <h1 className="text-2xl font-bold">LaTeX CV Builder</h1>
        </header>
        <main className="container p-4 mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
