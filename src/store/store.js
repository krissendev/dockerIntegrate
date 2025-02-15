import { writable, derived } from 'svelte/store';
import { createDebugStore } from './storeDebugger.js';// export const cookieConsent = createLoggedStore(false, 'cookieConsent');


export const cookieConsentVisible = writable(false);
export const sessionPreferences = writable({
    darkMode:false,
    lang:"en"
});
export const cookieConsent = writable(false);
export const cookieState = writable(''); //document.

export const cssDarkmodeModal = writable('whiteModal'); //whiteModal , darkModal
export const isMobile = writable(false) //BOOL, nav.css max-width: 540px, nav.js

//prevent burgermenu scroll bleed/overflow, toggles Nav/mobileModal.display(none|block)
export const cookieModalOverflow = writable('none')


//TODO Create lazy loading for language data?
export const langdataHome =writable('')
export const langdataHome1 =writable('')
export const langdataAbout =writable('')
export const langdataProject =writable('')
export const langdataContact =writable('')