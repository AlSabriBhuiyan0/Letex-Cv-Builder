import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const authRouter = require('./routes/auth-routes.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://latex-resume-builder.vercel.app",
    "https://latex-cv-builder-f0e1b10b4d69.herokuapp.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Use the auth routes
app.use("/api/v1/auth", authRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connection to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
