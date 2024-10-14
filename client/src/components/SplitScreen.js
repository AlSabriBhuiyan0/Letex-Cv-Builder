import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const SplitScreen = () => {
    const [latexCode, setLatexCode] = useState('');
    const previewRef = useRef(null);

    const handleInputChange = (event) => {
        setLatexCode(event.target.value);
    };

    const generatePDF = async () => {
        if (previewRef.current) {
            const canvas = await html2canvas(previewRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("latex-document.pdf");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="overflow-y-auto flex-1 p-4">
                <h2 className="mb-2 text-xl font-bold">Latex Editor</h2>
                <textarea
                    className="overflow-hidden p-2 w-full h-full rounded border resize-none"
                    value={latexCode}
                    onChange={handleInputChange}
                    placeholder="Enter your Latex code here..."
                />
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 border-r">
                <h2 className="mb-2 text-xl font-bold">Live Preview</h2>
                <div ref={previewRef} className="overflow-hidden p-4 h-full whitespace-normal break-words rounded border latex-preview">
                    <BlockMath>{latexCode}</BlockMath>
                </div>
                <button
                    onClick={generatePDF}
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded transition hover:bg-blue-600"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};

export default SplitScreen;
