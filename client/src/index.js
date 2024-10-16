import React from 'react';
import ReactDOM from 'react-dom/client'; // Change from ReactDOM.render to ReactDOM.createRoot for React 18
import './index.css';  // This should contain the Tailwind directives
import App from './App';
import './App.css';    // Your custom styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
