import {parseLangAndPath} from '$lib/routing/loadLangData.js'
import { redirect } from '@sveltejs/kit';
import {sessionPreferences} from '$store/store.js';
import {updateStoreObject, storeMap}from '$lib/routing/storeHandler.js'
//url handling similar to /routes/[...slug]/+page.js
export function routing({params}){
    const url = params.slug ? params.slug:params.lang; //set to [...slug] or [lang]
    let lang="en"; 
    let path="home";
    
    //if route is "/" then this section is skipped

    if(url){

        //need to handle cookie case ???


        // if cookie contains lang 
        // cookieLang && not contain lang ?

        [lang, path]=parseLangAndPath(url);

        
    }
    //Should sessionPreference or document.cookie dictate ? 
    // Does the DOM apply cookie to sessionPreference ?
    
    console.log("lang;", lang, " path:", path)
    
    //Update language /store value based on URI
    updateStoreObject(storeMap.sessionPreferences, "lang", lang)
        return {
			title: 'Hello world!',
			content: `Current route does not exist: ${url}, path: /${lang}/${path}`,
            lang:lang, 
            path:path
		};
}