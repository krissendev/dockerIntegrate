import { writable, derived } from 'svelte/store';


export const cookieConsentVisible = writable(false);
export const sessionPreferences = writable({
    darkMode:false,
    lang:"en"
});
