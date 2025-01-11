import {parseLangAndPath} from '$lib/layout/langLoad.js'
import { redirect } from '@sveltejs/kit';

//url handling similar to /routes/[...slug]/+page.js
export function load({params}){
    const url = params.slug;
    const [lang, path]=parseLangAndPath(url);
    if(path==="home"){
        redirect(307, "/");
    }
    console.log(lang, path)
        return {
			title: 'Hello world!',
			content: `Current route does not exist: ${url}`
		};

}
