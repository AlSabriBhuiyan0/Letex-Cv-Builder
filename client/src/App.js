import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplitScreen from "./components/SplitScreen";
import Navbar from "./components/Header";
import LatexCommands from "./pages/Commands";
import Commands from './components/Commands';
import Home from './components/Home';
import "./index.css"; // This should contain the Tailwind directives
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="p-4 text-white bg-blue-600">
          <div className="container flex justify-between items-center mx-auto">
            <h1 className="text-2xl font-bold">LaTeX Editor</h1>
            <nav>
              <Link to="/" className="mr-4 hover:underline">Home</Link>
              <Link to="/commands" className="hover:underline">LaTeX Commands</Link>
            </nav>
          </div>
        </header>

        <main className="container p-4 mx-auto mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="mb-4 text-xl font-bold">LaTeX Editor</h2>
              <textarea
                className="p-2 w-full h-64 rounded border"
                placeholder="Enter your LaTeX code here..."
              ></textarea>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h2 className="mb-4 text-xl font-bold">Live Preview</h2>
              <div className="p-2 w-full h-64 rounded border">
                {/* Live preview content will go here */}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commands" element={<Commands />} />
      </Routes>
    </Router>
  );
}

export default App;
