import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://latex-cv-builder-f0e1b10b4d69.herokuapp.com'
  : 'http://localhost:5000';

const ResumeForm = () => {
  const [data, setData] = useState({ name: '', email: '', latexInput: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/resume`, data);
      console.log(response.data);
      generatePDF(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to generate resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = (resumeData) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Resume', 10, 10);
    
    doc.setFontSize(12);
    doc.text(`Name: ${resumeData.name}`, 10, 20);
    doc.text(`Email: ${resumeData.email}`, 10, 30);
    
    // Add LaTeX content
    doc.text('LaTeX Content:', 10, 40);
    doc.text(resumeData.latexInput, 10, 50);

    doc.save('resume.pdf');
  };

  return (
    <div className="flex flex-col md:flex-row">
      <form onSubmit={handleSubmit} className="p-4 w-full md:w-1/2">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          onChange={handleChange} 
          required 
          className="p-2 mb-4 w-full rounded border"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          onChange={handleChange} 
          required 
          className="p-2 mb-4 w-full rounded border"
        />
        <textarea
          name="latexInput"
          placeholder="Enter your LaTeX here..."
          onChange={handleChange}
          className="p-2 mb-4 w-full h-64 rounded border"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="p-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Generating...' : 'Generate and Download Resume'}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
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

export default ResumeForm;
