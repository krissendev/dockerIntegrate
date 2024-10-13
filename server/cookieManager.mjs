const cookieBase = "SameSite=Strict;path=/;";   
const languageMap = {
    'en': 'en',
    'en-us': 'en',
    'en-gb': 'en',
    'en-au': 'en',
    'no': 'no',
    'nb-no': 'no',
    'nn-no': 'no'
}
const subDomain={
    '':'home',
    '/':'home',
    'home':'home',
    'about':'about',
}
let languageCookie;
const cookieName = 'language';

export function getLang(key){
    if(typeof(key)==='string'){
        //"en-US,en;q=0.5" -> ["en-US", "en"]
        key = key.toLowerCase()    
        let keys = key.split(',');
        keys.map(keysentry => keysentry.split(';')[0])
        for(let i =0; i<keys.length; i++){
            const lang= languageMap[keys[i]];
            if(lang){return lang}
        }
        return undefined;
    }
    else if(key.constructor === Array){
        for(let i =0; i<key.length; i++){
            const lang= languageMap[key[i]];
            if(lang){return lang}
        }
        return undefined;
    }
    return undefined;
}

export function getPage(entry){
    entry = entry.toLowerCase()
    const domain = subDomain[entry]
    if(domain){return domain}
    else{return undefined;}
}

function cookieInit(){
    if(!document.cookie){
        languageCookie = languageMap[navigator.language];
        console.log(navigator.language)
        console.log(languageCookie)
        // setCookie()
    }
}

function setCookie(languageCookie){
    let language = `language=${languageCookie};`
    document.cookie = `${language} ${cookieBase}`
}
export function getCookieValue(name, cookieDataType){   
    //cookies (cookieDataType) is string on frontend
    if(typeof(cookieDataType)==='string'){
        const cookies = document.cookie.split(';');    
        for(let cookie of cookies){
            const [cookieName, cookieValue] = cookie.split('=');
            if(cookieName ===name){
                return cookieValue;
            }
        }
    }

    //cookies (cookieDataType) is object inside array on backend
    else if(typeof(cookieDataType)==='object'){        
        for(const property in cookieDataType){
            if(property ===name){
                return cookieDataType[property];
            }
        }
    }
    
    else{console.log(`cookieManager.mjs getCookieValue cookieDataType unrecognized type. name:${name}, cookieDataType:${cookieDataType}, datatype:`,typeof(cookieDataType))}

}

function endpointLanguage(){}




