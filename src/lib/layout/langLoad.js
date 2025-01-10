
//Language Priority
//URL
//Cookie
//BrowserSetting
//En

//await browser for cookies
export function initOnMount(){
    document.cookie = "lang=no"
    const cookies = document.cookie.split(';');
    for(let cookie of cookies){
        const [cookieName, cookieValue] = cookie.split('=').map((arrElement)=> arrElement.trim());
        if(cookieName==="lang"){
            console.log("returning...", cookieValue)
            return cookieValue;
        }
    }
}