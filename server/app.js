const express = require('express');
const latex = require('node-latex');
const app = express();

app.use(express.json());

app.post('/api/render-latex', (req, res) => {
  const { latexInput } = req.body;
  
  // This is a placeholder. You'll need to implement actual LaTeX to HTML conversion.
  // You might use a library like MathJax-node or a custom solution.
  const renderedHTML = convertLatexToHTML(latexInput);
  
  res.json({ renderedHTML });
});

function convertLatexToHTML(latex) {
  // Implement LaTeX to HTML conversion here
  // This is just a placeholder
  return `<div>${latex}</div>`;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
