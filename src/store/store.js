import { writable, derived } from 'svelte/store';


export const cookieConsentVisible = writable(false);
export const sessionPreferences = writable({
    darkMode:false,
    lang:"en"
});
export const cookieConsent = writable(false);
export const cookieState = writable(''); //document.

export const cssModal = writable('whiteModal'); //whiteModal , darkModal