<script>
    import {onMount} from 'svelte'
    import {initOnMount} from '$lib/layout/langLoad.js'
    import jsonfile from '$lib/language.json';

    let cookieLang = '';
    let content;


    //Language Priority
    //URL
    //Cookie
    //BrowserSetting
    //En

    onMount(async ()=>{
        cookieLang = await initOnMount();
        content =await jsonfile[cookieLang].content;
    })
</script>
<h3>Lang</h3>
<h3>{content}</h3>