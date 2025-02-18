
import {cookieState, cookieConsent} from '$store/store.js';
import {updateStorePrimitive, storeMap} from '$lib/routing/storeHandler.js'

export const cookieBase = "SameSite=Strict;path=/;";
const expirationValue = "expires=Thu, 01 Jan 1970 00:00:00; GMT;Max-Age=0;"

export function documentSetCookie(){

}
export function storeSetCookieState(){

}

export function getCookieValue(name){
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

const CookieTable=['darkMode', 'lang']
export function deleteCookies(){
    for(let i=0;i<CookieTable.length; i++){
        document.cookie=`${CookieTable[i]}='';${expirationValue} ${cookieBase}`
    }
    updateStorePrimitive(storeMap.cookieState, document.cookie)
    updateStorePrimitive(storeMap.cookieConsent, false)
    //currentConsent=get(cookieConsent);  
}