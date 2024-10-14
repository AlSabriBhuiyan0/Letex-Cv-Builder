import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import ResumeForm from "./components/ResumeForm";
import Commands from "./components/Commands";
import "./index.css"; // This should contain the Tailwind directives
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="p-4 text-white bg-blue-600">
          <div className="container flex justify-between items-center mx-auto">
            <h1 className="text-2xl font-bold">LaTeX CV Builder</h1>
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "mr-4 underline" : "mr-4 hover:underline"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/commands"
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                Commands
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="flex-grow container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<ResumeForm />} />
            <Route path="/commands" element={<Commands />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
