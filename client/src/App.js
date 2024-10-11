import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplitScreen from './components/SplitScreen';
import Navbar from './components/Header';
import LatexCommands from './pages/Commands';
import './index.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<SplitScreen />} /> {/* Home page */}
                    <Route path="/commands" element={<LatexCommands />} /> {/* Latex Commands page */}
                    {/* Add more routes as you need later */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
