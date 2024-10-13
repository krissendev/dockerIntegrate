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


//Api endpoint
app.get('/api/language', (req, res) => {
  const languageCookie = getCookieValue("language", req.cookies);
  const languageHeader = req.headers['accept-language'];
  const languagefromHeader = getLang(languageHeader)
  
  //from Language.svelte
  const languageCode = req.headers['languagetag'];
  const subPage = req.headers['pagetag'];
  const filePath = path.join(__dirname,'/language/' ,`${languageCode}-${subPage}.json`)
  

    fs.readFile(filePath, 'utf8', (err, jsonData)=>{
      const content = JSON.parse(jsonData);
      if(content){
        res.json(content)
      }
      else{
        res.json(
          {"error":"json data not found"}
        )
      }   
    })  
 
});


// app.get('/:lang/:page',(req,res, next)=>{
//   const languageEncoding = getLang(req.params.lang.toLowerCase());
//   const pageEncoding = getLang(req.params.page.toLowerCase());
//   console.log(languageEncoding)
//   next();
// });


// app.get('/:lang',(req,res, next)=>{
//   const languageEncoding = getLang(req.params.lang.toLowerCase());
//   console.log(languageEncoding)
//   next();
// });








// For any routes not matched by static files, serve the main index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});









// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
