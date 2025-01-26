import { get } from 'svelte/store';
import {sessionPreferences, cookieConsent, cookieState} from '$store/store.js';
/*cookieConsentVisible.update(value => !value);*/
export const cookieBase = "SameSite=Strict;path=/;";   
export let darkMode=false; //false means white, true means dark
export function initOnMount(){
    cookieInit();
}

function cookieInit(){
    console.log("init")
    if(!document.cookie){
        const cookieEnabled = get(cookieConsent); 
        console.log("Reactive enabled?", cookieEnabled)
        if(cookieEnabled){
            //cookie initiliazation
            setCookieDarkMode(false)
            const preference = get(sessionPreferences);
            const currentDarkModePref = preference["darkMode"]  
            console.log("enabled:",currentDarkModePref )
            setSessiontDarkMode(currentDarkModePref);
            setCookieDarkMode(currentDarkModePref)
            cookieState.set(document.cookie)
        }
        else{
            //default initial, no cookie consent
            setSessiontDarkMode(false);
        }
    }
    else{
        darkMode = getCookieValue("darkMode") === "true";
        setCanvas(darkMode)  
    }
}
function setCookieDarkMode(bool){
    let cookieDarkMode = `darkMode=${bool};`
    document.cookie = `${cookieDarkMode} ${cookieBase}`
}
function setSessiontDarkMode(bool){
    sessionPreferences.update(value=>{
        return{...value, darkMode:bool}
    });
}

function getCookieValue(name){
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        //sepparates key-values on "=" and removes any whitespace
        const [cookieName, cookieValue] = cookie.split('=').map((arrElement)=> arrElement.trim());
        if(cookieName === name){
            return cookieValue;
        }
    }
    return null;
}
function getSessionValue(name){
    const preferences = get(sessionPreferences); 
    return preferences[name];
}

function setCanvas(darkmode){

    if(darkMode){
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white'; 
    }
    else if(!darkMode){
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';  
    }
}



export function darkModeSwitch(){
    //darkMode = getCookieValue("darkMode") === "true";
    const cookieEnabled = get(cookieConsent); 
    darkMode = getSessionValue("darkMode");
    //darkMode true is dark - change to white
    if(darkMode){ 
        darkMode = !darkMode;
        setSessiontDarkMode(false);
        setCanvas(darkMode)
        if(cookieEnabled){
            setCookieDarkMode(false);
            cookieState.set(document.cookie)
        }
    }
    //darkMode false is white - change to dark
    else if(!darkMode){
        darkMode = !darkMode;
        setSessiontDarkMode(true);
        setCanvas(darkMode)
        if(cookieEnabled){
            setCookieDarkMode(true);
            cookieState.set(document.cookie)
        }  
    }       
}
