import { writable, derived } from 'svelte/store';


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