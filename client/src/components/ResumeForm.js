import React, { useState, useRef } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://latex-cv-builder-f0e1b10b4d69.herokuapp.com'
  : 'http://localhost:5000';

const ResumeForm = () => {
  const [data, setData] = useState({ name: '', email: '', latexInput: '' });
  const [renderedCV, setRenderedCV] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previewRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/render-cv`, data);
      setRenderedCV(response.data.renderedCV);
    } catch (error) {
      console.error(error);
      setError('Failed to generate CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv.pdf');
    }
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
          placeholder="Enter your LaTeX CV content here..."
          onChange={handleChange}
          className="p-2 mb-4 w-full h-64 rounded border"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="p-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Generating...' : 'Generate CV'}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
      <div className="p-4 w-full md:w-1/2">
        <h2 className="mb-4 text-xl font-bold">CV Preview</h2>
        <div ref={previewRef} className="p-4 rounded border" dangerouslySetInnerHTML={{ __html: renderedCV }} />
        {renderedCV && (
          <button
            onClick={generatePDF}
            className="p-2 mt-4 w-full text-white bg-green-500 rounded hover:bg-green-600"
          >
            Download CV as PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
