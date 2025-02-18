import { get } from 'svelte/store';
import {updateStorePrimitive, updateStoreObject, storeMap}from '$lib/routing/storeHandler.js'
import {getCookieValue} from '$lib/routing/cookieHandler.js'
import {sessionPreferences, cookieConsent, cookieState, cssDarkmodeModal} from '$store/store.js';
/*cookieConsentVisible.update(value => !value);*/
export const cookieBase = "SameSite=Strict;path=/;";   
export let darkMode=false; //false means white, true means dark


export function initOnMount(){
    if(!document.cookie){

        //Match "store" darkmode setting with browser darkmode setting
        const browserDarkmode = window.matchMedia("(prefers-color-scheme:dark)").matches;
        
        updateStoreObject(storeMap.sessionPreferences, "darkMode", browserDarkmode)

        const cookieEnabled = get(cookieConsent); 
        if(cookieEnabled){
            //cookie initiliazation
            setCookieDarkMode(browserDarkmode)
            
            setSessiontDarkMode(browserDarkmode);
            setCookieDarkMode(browserDarkmode)
            updateStorePrimitive(storeMap.cookieState ,document.cookie)
            
            setCanvas(browserDarkmode)
        }
        else{
            //default initial, no cookie consent
            setSessiontDarkMode(browserDarkmode);
            setCanvas(browserDarkmode)
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
    updateStoreObject(storeMap.sessionPreferences, "darkMode", bool)
}

function getSessionValue(name){
    const preferences = get(sessionPreferences); 
    return preferences[name];
}

function setCanvas(darkmodeValue){
    if(darkmodeValue){
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white'; 
        //cssDarkmodeModal.update(current => current === 'whiteModal' ? 'darkModal' : 'whiteModal');
        updateStorePrimitive(storeMap.cssDarkmodeModal, "darkModal");
    }
    else if(!darkmodeValue){
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        updateStorePrimitive(storeMap.cssDarkmodeModal, "whiteModal");       
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
            updateStorePrimitive(storeMap.cookieState, document.cookie);       
        }
    }
    //darkMode false is white - change to dark
    else if(!darkMode){
        darkMode = !darkMode;
        setSessiontDarkMode(true);
        setCanvas(darkMode)
        if(cookieEnabled){
            setCookieDarkMode(true);
            updateStorePrimitive(storeMap.cookieState, document.cookie)
        }  
    }       
}
