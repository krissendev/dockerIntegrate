import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Get the current directory of this module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the 'public' folder (where the Svelte build will be)
app.use(express.static(path.join(__dirname, '../public')));

// For any routes not matched by static files, serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
