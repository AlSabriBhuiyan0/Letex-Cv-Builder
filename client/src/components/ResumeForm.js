import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-heroku-app-url.herokuapp.com'
  : 'http://localhost:5000';

const ResumeForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', latexInput: '' });
  const [renderedCV, setRenderedCV] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const previewRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const renderLatex = async () => {
      if (formData.latexInput) {
        setIsLoading(true);
        try {
          const response = await axios.post(`${API_URL}/api/render-latex`, { latexInput: formData.latexInput });
          setRenderedCV(response.data.renderedHTML);
        } catch (error) {
          console.error('Error rendering LaTeX:', error);
          setError('Failed to render LaTeX. Please check your input.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    renderLatex();
  }, [formData.latexInput]);

  const generateAndDownloadCV = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
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
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">LaTeX CV Builder</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange} 
          className="w-full p-2 mb-4 border rounded"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange} 
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          name="latexInput"
          placeholder="Enter your LaTeX CV content here..."
          value={formData.latexInput}
          onChange={handleChange}
          className="w-full p-2 h-64 mb-4 border rounded"
        />
        <button 
          onClick={generateAndDownloadCV}
          disabled={isLoading}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Generate and Download CV
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div ref={previewRef} className="border rounded p-4">
          <div dangerouslySetInnerHTML={{ __html: renderedCV }} />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
