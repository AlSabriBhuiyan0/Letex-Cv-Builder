import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import latex from "node-latex";
import fs from "fs";
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// LaTeX rendering route
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
      console.error('Error stack:', err.stack);
      console.error('LaTeX input:', input);
      res.status(500).json({ error: 'Failed to render LaTeX', details: err.message, stack: err.stack });
    });
});

// Your existing API route
app.post('/api/resume', (req, res) => {
  const { name, email } = req.body;
  res.json({ name, email, message: 'Resume data received successfully' });
});

// Add this route to check LaTeX installation
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
