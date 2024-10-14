const express = require('express');
const bodyParser = require('body-parser');
const latex = require('node-latex');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/render-latex', (req, res) => {
  const { name, email, latexInput } = req.body;

  if (!name || !email || !latexInput) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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
    cmd: 'pdflatex',
    passes: 1,
    errorLogs: path.join(__dirname, 'errors.log'),
  };

  latex(input, options).pipe(fs.createWriteStream(output))
    .on('finish', () => {
      // For now, we'll just send back a simple HTML representation
      const html = `
        <h1>${name}</h1>
        <p><a href="mailto:${email}">${email}</a></p>
        <div>${latexInput.replace(/\n/g, '<br>')}</div>
      `;
      res.json({ renderedHTML: html });
    })
    .on('error', (err) => {
      console.error('LaTeX Error:', err);
      res.status(500).json({ error: 'Failed to render LaTeX', details: err.message });
    });
});

app.get('/check-latex', (req, res) => {
  exec('pdflatex --version', (error, stdout, stderr) => {
    if (error) {
      res.send(`LaTeX not found: ${error.message}`);
      return;
    }
    if (stderr) {
      res.send(`LaTeX error: ${stderr}`);
      return;
    }
    res.send(`LaTeX version: ${stdout}`);
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
