import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Home = () => {
  const [data, setData] = useState({ name: '', email: '', latexInput: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Resume', 10, 10);
      doc.setFontSize(12);
      doc.text(`Name: ${data.name}`, 10, 20);
      doc.text(`Email: ${data.email}`, 10, 30);
      doc.text('LaTeX Content:', 10, 40);
      doc.text(data.latexInput, 10, 50);
      doc.save('resume.pdf');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to generate resume. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-4 w-full md:w-1/2">
        <h2 className="mb-4 text-xl font-bold">LaTeX CV Builder</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          onChange={handleChange} 
          className="p-2 mb-4 w-full rounded border"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          onChange={handleChange} 
          className="p-2 mb-4 w-full rounded border"
        />
        <textarea
          name="latexInput"
          placeholder="Enter your LaTeX here..."
          onChange={handleChange}
          className="p-2 mb-4 w-full h-64 rounded border"
        />
        <button 
          onClick={generatePDF}
          className="p-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Generate and Download Resume
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
      <div className="p-4 w-full md:w-1/2">
        <h2 className="mb-4 text-xl font-bold">Live Preview</h2>
        <div className="p-4 rounded border">
          <h3 className="font-bold">Name: {data.name}</h3>
          <p>Email: {data.email}</p>
          <div className="mt-4">
            <h4 className="font-bold">LaTeX Preview:</h4>
            <BlockMath>{data.latexInput}</BlockMath>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
