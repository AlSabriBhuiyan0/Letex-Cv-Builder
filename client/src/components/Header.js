import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="p-4 bg-blue-600">
            <div className="container flex items-center justify-between mx-auto">
                <h1 className="text-2xl font-bold text-white">Latex Editor</h1>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-lg text-white hover:underline">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/commands" className="text-lg text-white hover:underline">
                            Latex Commands
                        </Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
