import {parseLangAndPath} from '$lib/routing/loadLangData.js'
import { redirect } from '@sveltejs/kit';
import {sessionPreferences} from '$store/store.js';

//url handling similar to /routes/[...slug]/+page.js
export function routing({params, cookies}){
    const url = params.slug ? params.slug:params.lang; //set to [...slug] or [lang]
    console.log("what is url?", url)
    console.log(params)
    let lang=undefined; 
    let path=undefined;
    
    //if route is "/" then this section is skipped
    if(url){
        
        [lang, path]=parseLangAndPath(url);
    }
    //if URL does not cointain lang, check for cookie

    if(!lang){
        
        
        let cookieLang = cookies.get("lang");
        console.log("serverside cookie?", cookieLang)
        
        cookieLang = cookieLang?cookieLang:"en"; //check if truthy value else en
        path = path?path:"home";                   //check if truthy value else home
        
        console.log("!lang !url - lang;", cookieLang, " path:", path)
        
        return{lang:cookieLang, path:path}
    }

    path = path?path:"home";
    //Should sessionPreference or document.cookie dictate ? 
    // Does the DOM apply cookie to sessionPreference ?
    
    console.log("has url lang;", lang, " path:", path)
    
        return {
            lang:lang, 
            path:path
		};
}