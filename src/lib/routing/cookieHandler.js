
import {cookieState, cookieConsent} from '$store/store.js';
import {updateStorePrimitive, storeMap} from '$lib/routing/storeHandler.js'

export const cookieBase = "SameSite=Strict;path=/";
const expirationValueDELETE = "expires=Thu, 01 Jan 1970 00:00:00; GMT;Max-Age=0"
const cookieDuration = 86400 * 30; //30 days

export function documentSetCookie(key, value){
    let setCookie =`${key}=${value}`
    let expirationDate = new Date();
    //Date is in timeformate -> getTime get's miliseconds, setTime converts miliseconds back to timeformat
    expirationDate.setTime(expirationDate.getTime() +(cookieDuration*1000))
    document.cookie = `${setCookie}; expires=${expirationDate}; Max-Age=${cookieDuration}; ${cookieBase};`


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
        document.cookie=`${CookieTable[i]}='';${expirationValueDELETE}; ${cookieBase};`
    }
    updateStorePrimitive(storeMap.cookieState, document.cookie)
    updateStorePrimitive(storeMap.cookieConsent, false)
    //currentConsent=get(cookieConsent);  
}