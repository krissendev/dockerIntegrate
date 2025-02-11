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
        cookieLang = await languageInitOnMount();
        
        //if cookieLang has value "lang"
        if(cookieLang){
            console.log("cookie lang:", cookielang)
            content =await jsonfile[cookieLang].content;
        }
    })
</script>
<h3>Lang</h3>
<h3>{$content}</h3>