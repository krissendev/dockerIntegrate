import {parseLangAndPath} from '$lib/layout/langLoad.js'
import { redirect } from '@sveltejs/kit';

//url handling similar to /routes/[...slug]/+page.js
export function routing({params}){
    const url = params.slug ? params.slug:params.lang; //set to [...slug] or [lang]
    let lang="en"; 
    let path="home";
    if(url){
        [lang, path]=parseLangAndPath(url);
    }
    console.log("lang;", lang, " path:", path)
        return {
			title: 'Hello world!',
			content: `Current route does not exist: ${url}, path: /${lang}/${path}`,
            lang:lang, 
            path:path
		};
}