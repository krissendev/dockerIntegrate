//url handling similar to /routes/[...slug]/+page.js
export function load({params}){
    const url = params.slug;
    console.log(url)
        return {
			title: 'Hello world!',
			content: `Current route does not exist: ${url}`
		};

}