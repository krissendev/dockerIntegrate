import { get }                              from 'svelte/store';
import {cookieConsentVisible, 
    sessionPreferences,
    cookieConsent,
    cookieState,
    cssDarkmodeModal,
    isMobile,
    cookieModalOverflow,
    langdataHome,
     langdataAbout,
      langdataProject,langdataContact,}     from '$store/store.js';


export const storeMap = {
        cookieConsentVisible, 
        sessionPreferences,
        cookieConsent,
        cookieState,
        cssDarkmodeModal,
        isMobile,
        cookieModalOverflow,
        langdataHome,
         langdataAbout,
          langdataProject,
           langdataContact}


export function updateStoreObject(storeMapEntry, key, newValue){
    storeMapEntry.update(object=>{
        return{...object, [key]:newValue}
    })
}

export function updateStorePrimitive(storeMapEntry, newValue){
    storeMapEntry.set(newValue)
} 
export function updateStoreBoolToggle(storeMapEntry){
    storeMapEntry.update(value=>{
        return !value
    })
}

export function getStoreValue(storeMapEntry){
    const storevalue = get(storeMapEntry)
    console.log("currentStoreValue;", storevalue)
    return storevalue;
}