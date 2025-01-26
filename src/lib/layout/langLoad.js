
//Language Priority
//URL
//Cookie
//BrowserSetting
//En

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
    let lang=''
    let path=''
    for (const segment of urlSegments){
        if(urlRoutePathMap[segment && !lang]){
            path=segment;
        }
        else if(urlRouteLangMap[segment && !path]){
            lang=segment;
        }
        if(lang && path)break;
        if (!lang) lang = "en"; // Default language
        if (!path) path = "home"; // Default route
        return [lang, path];
    }
    console.log(`loaded:${url}`, urlString.length)
    return null;
}