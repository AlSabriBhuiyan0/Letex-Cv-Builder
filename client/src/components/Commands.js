import React from 'react';

const Commands = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold">LaTeX Commands for CV/Resume</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xl font-semibold">Text Formatting</h3>
          <ul className="pl-5 space-y-1 list-disc">
            <li>\textbf{text} - Bold text</li>
            <li>\textit{text} - Italic text</li>
            <li>\underline{text} - Underlined text</li>
            <li>\textsc{text} - Small caps text</li>
            <li>\emph{text} - Emphasized text</li>
            <li>\large{text} - Larger text</li>
            <li>\small{text} - Smaller text</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Document Structure</h3>
          <ul className="pl-5 space-y-1 list-disc">
            <li>\section{title} - Create a section</li>
            <li>\subsection{title} - Create a subsection</li>
            <li>\begin{document} ... \end{document} - Main document environment</li>
            <li>\begin{itemize} ... \end{itemize} - Unordered list</li>
            <li>\begin{enumerate} ... \end{enumerate} - Ordered list</li>
            <li>\item - List item</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">CV/Resume Specific</h3>
          <ul className="pl-5 space-y-1 list-disc">
            <li>\hspace{length} - Add horizontal space</li>
            <li>\vspace{length} - Add vertical space</li>
            <li>\begin{tabular}{columns} ... \end{tabular} - Create a table</li>
            <li>\hline - Horizontal line in tables</li>
            <li>\cline{i-j} - Partial horizontal line in tables</li>
            <li>\multicolumn{num}{align}{content} - Span multiple columns</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Useful Packages</h3>
          <ul className="pl-5 space-y-1 list-disc">
            <li>\usepackage{hyperref} - For clickable links</li>
            <li>\usepackage{geometry} - For page layout</li>
            <li>\usepackage{fontawesome} - For icons</li>
            <li>\usepackage{titlesec} - For custom section formatting</li>
            <li>\usepackage{multicol} - For multiple columns</li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-semibold">Example CV Structure</h3>
        <pre className="overflow-x-auto p-4 bg-gray-100 rounded">
          {`\\documentclass[a4paper,11pt]{article}
\\usepackage{hyperref}
\\usepackage{geometry}

\\begin{document}

\\section{Personal Information}
\\textbf{Name:} John Doe
\\hspace{2cm} \\textbf{Email:} john.doe@email.com

\\section{Education}
\\textbf{University Name} \\hfill 2015-2019
\\\\Bachelor of Science in Computer Science

\\section{Work Experience}
\\textbf{Company Name} \\hfill 2019-Present
\\\\Software Developer
\\begin{itemize}
  \\item Developed and maintained web applications
  \\item Collaborated with cross-functional teams
\\end{itemize}

\\end{document`}
        </pre>
      </div>
    </div>
  );
};

export default Commands;
