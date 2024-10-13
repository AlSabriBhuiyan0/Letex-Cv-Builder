import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/index.js';
import authRouter from './routes/auth-routes.js';
import bcrypt from 'bcrypt'; // or 'bcryptjs' if you switched

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://latex-resume-builder.vercel.app",
    "https://git.heroku.com/latex-cv-builder.git",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/generate-pdf", (req, res) => {
  const latexCode = req.body.latex;

  const filePath = path.join(__dirname, "resume.tex");
  const pdfPath = path.join(__dirname, "resume.pdf");
  fs.writeFileSync(filePath, latexCode);
  exec(
    `pdflatex -interaction=nonstopmode ${filePath}`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        return res.status(500).send("Error generating PDF");
      }
      if (!fs.existsSync(pdfPath)) {
        return res.status(500).send("PDF not generated");
      }
      res.download(pdfPath, "resume.pdf", (err) => {
        if (err) {
          console.error("Error downloading file:", err);
        }
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting .tex file:", err);
        });
        fs.unlink(pdfPath, (err) => {
          if (err) console.error("Error deleting .pdf file:", err);
        });
      });
    }
  );
});

// Use the below route to use the auth feature
app.use("/api/v1/auth", authRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connection to DB:
connectDB()
  .then(() => {
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
