import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import {getLang, getsubDomain, getCookieValue} from './cookieManager.mjs'

const app = express()
const port = 3000 

//commonjs path -> esmodule
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'))
app.use(cookieParser());




app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


//url language encoded sub
app.get('/:lang/:suburl',(req,res)=>{
  const languageEncoding = getLang(req.params.lang);
  const subdomain = req.params.suburl.toLowerCase();
  const htmlFilePath = path.join(__dirname, `${subdomain}.html`)

  console.log(`App.get/:lang/:suburl=("${req.params.lang}" , "${req.params.suburl}")=> "${languageEncoding}"`);  
  
  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if(err){return res.status(500).send(`Error read ${subdomain}.html`)}

    if(languageEncoding){
      //get languageEncoding based json
      const jsonFilePath = path.join(__dirname, `${subdomain}-${languageEncoding}.json`)
      fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
        if(err){return res.status(500).send(`Error read ${subdomain}-${languageEncoding}.json`)}
        const content = JSON.parse(jsonData);


        //combine html with json
        let finalHtml = htmlData
          .replace('<h2 id="title">Title Placeholder</h2>',`<h2 id="title">${content.title}</h2>`)
          .replace('<p id="description">Content Placeholder</p>',`<p id="description">${content.content.description}</p>`);
          
          res.send(finalHtml);
      });
      
    }
    else{
      res.send(htmlData)
    }
  });
});


//custom middleware
app.use('/:suburl',(req,res,next)=>{
  const suburl = req.params.suburl; 

  //is suburl language
  if(getLang(suburl)){
    console.log("App.use/:suburl=GetLang");
    return next();
    }

  //is suburl subdomain
  if(getsubDomain(suburl)){
    
    const languageCookie = getCookieValue("language", req.cookies);
    const languageHeader = req.headers['accept-language'];
    const languagefromHeader = getLang(languageHeader)

    //redirect subdomain-language based on cookie
    if(languageCookie){
      console.log("App.use/:suburl=getsubDomain+lang=cookie");  
      return res.redirect(`/${languageCookie}/${suburl}`);
    }

    //redirect subdomain-language based on header
    else if(languagefromHeader){
      console.log("App.use/:suburl=getsubDomain+lang=header");  
      return res.redirect(`/${languagefromHeader}/${suburl}`);
    }
    //redirect subdomain-language barebones default english
    else{
      console.log("App.use/:suburl=getsubDomain+lang=default");  
      return res.redirect(`/en/${suburl}`);
    }  
  }
  next();
})


//url language encoded
app.get('/:lang',(req,res)=>{
  const languageEncoding = getLang(req.params.lang.toLowerCase());
  console.log(`App.get/:lang=("${req.params.lang}")=>("${languageEncoding}")`);  
  //if encoding match languageMap, not undefined
  
  //get html file
  const htmlFilePath = path.join(__dirname, 'home.html')
  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if(err){return res.status(500).send('Error read home.html')}

    if(languageEncoding){
      //get languageEncoding based json
      const jsonFilePath = path.join(__dirname, `home-${languageEncoding}.json`)
      fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
        if(err){return res.status(500).send(`Error read home-${languageEncoding}.json`)}
        const content = JSON.parse(jsonData);

        console.log("title: ",content.title)
        //combine html with json
        let finalHtml = htmlData
          .replace('<h2 id="title">Title Placeholder</h2>',`<h2 id="title">${content.title}</h2>`)
          .replace('<p id="description">Content Placeholder</p>',`<p id="description">${content.content.description}</p>`);
        
        console.log(finalHtml);
        res.send(finalHtml);
      });
      
    }
    else{
      res.send(htmlData)
    }
  });

  //const languageheader = getLang(req.params.lang.toLowerCase());
  //console.log(languageheader);
});




//url not language encoded
app.get('/', (req, res) => {
  // const responseSummary = {
  //   statusCode: res.statusCode,
  //   headersSent: res.headersSent,
  //   locals: res.locals,
  //   cookies: req.cookies,
  //   acceptLanguage: req.headers['accept-language']
  // };
  // const responseAsText = JSON.stringify(responseSummary, null, 2); 
  // res.send(responseAsText)
  
  const languageCookie = getCookieValue("language", req.cookies);
  const languageHeader = req.headers['accept-language'];
  const languagefromHeader = getLang(languageHeader)

  //cookie
  if(languageCookie){
    console.log("App.use/:suburl=getsubDomain+lang=cookie");  
    return res.redirect(`/${languageCookie}/`);
  }
  ///
  else if(languagefromHeader){
    console.log("App.use/:suburl=getsubDomain+lang=header");  
    return res.redirect(`/${languagefromHeader}/`);
  }
  //default
  else{
    console.log("App.use/:suburl=getsubDomain+lang=default");  
    return res.redirect(`/en/`);
  }  
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})





