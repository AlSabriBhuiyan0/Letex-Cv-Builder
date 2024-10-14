const express = require('express');
const bodyParser = require('body-parser');
const latex = require('node-latex');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/render-latex', (req, res) => {
  const { name, email, latexInput } = req.body;

  const input = `
\\documentclass{article}
\\usepackage{hyperref}
\\begin{document}

\\textbf{${name}}\\\\
\\href{mailto:${email}}{${email}}

${latexInput}

\\end{document}
  `;

  const output = path.join(__dirname, 'output.pdf');
  const options = {
    inputs: path.join(__dirname, 'inputs'),
    cmd: 'xelatex',
    passes: 2,
    errorLogs: path.join(__dirname, 'errors.log'),
  };

  latex(input, options).pipe(fs.createWriteStream(output))
    .on('finish', () => {
      // Here, you would convert the PDF to HTML
      // For now, we'll just send back a placeholder HTML
      const html = `
        <h1>${name}</h1>
        <p><a href="mailto:${email}">${email}</a></p>
        <div>${latexInput.replace(/\n/g, '<br>')}</div>
      `;
      res.json({ renderedHTML: html });
    })
    .on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to render LaTeX' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
