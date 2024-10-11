import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import katex from 'katex';

const SplitScreen = () => {
    const [latexCode, setLatexCode] = useState('');

    const handleInputChange = (event) => {
        setLatexCode(event.target.value);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const element = document.createElement('div');
        element.style.width = '100%';
        element.style.margin = '20px';

        // Render Latex to HTML using Katex
        try {
            const renderedHTML = katex.renderToString(latexCode, {
                throwOnError: false,
            });
            element.innerHTML = renderedHTML;

            // Add HTML content to PDF
            doc.html(element, {
                callback: () => {
                    doc.save('cv.pdf');
                },
                x: 10,
                y: 10,
            });
        } catch (error) {
            console.error("Error rendering Latex:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-4 overflow-y-auto">
                <h2 className="mb-2 text-xl font-bold">Latex Editor</h2>
                <textarea
                    className="w-full h-full p-2 overflow-hidden border rounded resize-none"
                    value={latexCode}
                    onChange={handleInputChange}
                    placeholder="Enter your Latex code here..."
                />
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto border-r">
                <h2 className="mb-2 text-xl font-bold">Live Preview</h2>
                <div className="h-full p-4 overflow-hidden break-words whitespace-normal border rounded latex-preview">
                    <BlockMath>{latexCode}</BlockMath>
                </div>
                <button
                    onClick={generatePDF}
                    className="px-4 py-2 mt-4 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default SplitScreen;
