import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://latex-cv-builder-f0e1b10b4d69.herokuapp.com'
  : 'http://localhost:5000';

const ResumeForm = () => {
  const [data, setData] = useState({ name: '', email: '' });
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
    
    // Add content to the PDF
    doc.setFontSize(18);
    doc.text('Resume', 10, 10);
    
    doc.setFontSize(12);
    doc.text(`Name: ${resumeData.name}`, 10, 20);
    doc.text(`Email: ${resumeData.email}`, 10, 30);
    
    // Add more resume data here...

    // Save the PDF
    doc.save('resume.pdf');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate and Download Resume'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ResumeForm;
