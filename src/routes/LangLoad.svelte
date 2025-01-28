<script>
    import {onMount} from 'svelte'
    import {languageInitOnMount} from '$lib/layout/langLoad.js'
    import jsonfile from '$lib/language.json';

    let cookieLang = '';
    let content;


    //Language Priority
    //URL
    //Cookie
    //BrowserSetting
    //En


    ///routes/LangLoad.svelte handles "/"
    ///routes/[...slug]/+page.js handles "/other"

    onMount(async ()=>{
        
        //cookie lang
        cookieLang = await languageInitOnMount();
        content =await jsonfile[cookieLang].content;
    })
</script>
<h3>Lang</h3>
<h3>{$content}</h3>