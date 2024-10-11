import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import {getLang, getsubDomain, getCookieValue} from './cookieManager.mjs'

const app = express();
const PORT = process.env.PORT || 3000;

// Get the current directory of this module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the 'public' folder (where the Svelte build will be)
app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/language', (req, res) => {
  const languageCookie = getCookieValue("language", req.cookies);
  const languageHeader = req.headers['accept-language'];
  const languagefromHeader = getLang(languageHeader)
  
  const languageCode = req.headers['languagetag'];
  console.log("content;",languageCode)
  if(languageCode=="en"){
    const jayson={
      "from the server":"here follows an english translation",
      "element1":"this is a secret"

    }
    res.json(jayson)
  }
  else if(languageCode=="no"){
      const jayson={"fra serveren":"her kommer en norsk oversettelse"}
      res.json(jayson)
  }
  else{
      const jayson={"some error":"incorrect key"}
      res.json(jayson)
  }
  
});

// For any routes not matched by static files, serve the main index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});




app.get('/:lang',(req,res, next)=>{
  const languageEncoding = getLang(req.params.lang.toLowerCase());
  console.log(languageEncoding)
  next();
});




// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
