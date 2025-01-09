export const cookieBase = "SameSite=Strict;path=/;";   
export let darkMode=false; //false means white, true means dark

export function initOnMount(){
    cookieInit();
}

function cookieInit(){
    console.log(document.cookie)
    if(!document.cookie){
        setCookieDarkMode(false)
    }
    else{
        darkMode = getCookieValue("darkMode") === "true";
        setCanvas(darkMode)  
    }
}
function setCookieDarkMode(bool){
    console.log("the bool is ", bool, "and type of", typeof(bool))
    let cookieDarkMode = `darkMode=${bool};`
    console.log(cookieDarkMode);
    document.cookie = `${cookieDarkMode} ${cookieBase}`
}

function getCookieValue(name){
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        const [cookieName, cookieValue] = cookie.split('=');
        if(cookieName === name){
            return cookieValue;
        }
    }
    return null;
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
    darkMode = getCookieValue("darkMode") === "true";
    console.log("darkmode is ", darkMode, "and type of ", typeof(darkMode))
    //change to white
    if(darkMode){
        darkMode = !darkMode;
        setCookieDarkMode(false);
        setCanvas(darkMode)  
    }
    //change to dark
    else if(!darkMode){
        darkMode = !darkMode;
        setCookieDarkMode(true);
        setCanvas(darkMode)  
    }       
}
