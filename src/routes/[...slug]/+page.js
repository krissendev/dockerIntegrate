import {parseLangAndPath} from '$lib/layout/langLoad.js'
import { redirect } from '@sveltejs/kit';

//url handling similar to /routes/[...slug]/+page.js
export function load({params}){
    const url = params.slug;
    console.log("params.slug = segment? ", url)
    const [lang, path]=parseLangAndPath(url);
    console.log("lang;", lang, " path:", path)
    if(path==="home"){
        redirect(307, "/");
    }
        return {
			title: 'Hello world!',
			content: `Current route does not exist: ${url}, path: /${lang}/${path}`
		};

}
