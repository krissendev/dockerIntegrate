import { get } from 'svelte/store';
import {sessionPreferences} from '$store/store.js';
/*cookieConsentVisible.update(value => !value);*/
export const cookieBase = "SameSite=Strict;path=/;";   
export let darkMode=false; //false means white, true means dark
export function initOnMount(){
    cookieInit();
}

function cookieInit(){
    if(!document.cookie){
        //setCookieDarkMode(false)
        setSessiontDarkMode(false);
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
    darkMode = getSessionValue("darkMode");
    //darkMode true is dark - change to white
    if(darkMode){ 
        darkMode = !darkMode;
        //setCookieDarkMode(false);
        setSessiontDarkMode(false);
        setCanvas(darkMode)  
    }
    //darkMode false is white - change to dark
    else if(!darkMode){
        darkMode = !darkMode;
        //setCookieDarkMode(true);
        setSessiontDarkMode(true);
        setCanvas(darkMode)  
    }       
}
