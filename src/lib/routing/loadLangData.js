
//Language Priority
//URL
//Cookie
//BrowserSetting
//En
import jsonfile from '$lib/language.json';
import {langdataHome, langdataAbout, langdataProject, langdataContact, sessionPreferences} from '$store/store.js';
import {updateStorePrimitive, storeMap}from '$lib/routing/storeHandler.js'
import {get} from 'svelte/store';


//await browser for cookies
export function languageInitOnMount(){
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        //sepparates key-values on "=" and removes any whitespace
        const [cookieName, cookieValue] = cookie.split('=').map((arrElement)=> arrElement.trim());
        if(cookieName==="lang"){
            console.log("returning...", cookieValue)
            return cookieValue;
        }
    }
    return undefined;
}

let language;
let languageContent;
export async function loadLanguage(){
    
    language = get(sessionPreferences).lang;
    console.log("loadLang;", language)
    //cookieLang = await languageInitOnMount();
    //cookieLang="no";//
    //if cookieLang has value "lang"
    if(language){
        console.log("cookie lang:", language)
        languageContent =await jsonfile[language].content;
        
        //length iterator into store ?
        const langContentHome = await jsonfile[language].home;
        const langContentAbout = await jsonfile[language].about;
        const langContentProject = await jsonfile[language].project;
        const langContentContact = await jsonfile[language].contact;

        console.log(langContentAbout)

        updateStorePrimitive(storeMap.langdataHome, langContentHome)
        updateStorePrimitive(storeMap.langdataAbout, langContentAbout)
        updateStorePrimitive(storeMap.langdataProject, langContentProject)
        updateStorePrimitive(storeMap.langdataContact, langContentContact)

    }
}



const browserLangMap={
    "no":"no","nb":"no","nn":"no","se-NO":"no","sv-SE":"no", "da-DK":"no", "fi-FI":"no",
    "sv-FI":"no","se-FI":"no","en":"en","en-US":"en", "en-GB":"en","en-Ca":"en",
    "en-NZ":"en", "en-ZA":"en", "en-PH":"en", "en-SG":"en","en-MY":"en", "en-HK":"en",
    "en-PK":"en", "en-NG":"en", "en-JM":"en", "en-TT":"en", "en-BB":"en","en-KE":"en",
    "en-GH":"en","de-DE":"de", "de-AT":"de", "de-CH":"de", "de-LU":"de", "de-BE":"de",
    "de-LI":"de"
            
}
const urlRouteLangMap = new Set(["no", "en", "de"]);
const urlRoutePathMap = new Set(["home", "about", "contact"]);
    

export function parseLangAndPath(url){
    const urlSegments = url.split("/");
    let lang=undefined
    let path=undefined
    
    for (const segment of urlSegments){
        if(urlRoutePathMap.has(segment)){
            path=segment;
        }
        
        else if(urlRouteLangMap.has(segment)){
            lang=segment;
        }

    }
    return[lang, path]
    //lang = lang?lang:undefined;
    //if(lang && path){return [lang, path];};
    //if (!lang) {return ["en", path];} // Default language
    //if (!path){return [lang, "home"];} // Default route
    //else{return ["en", "home"];}
}