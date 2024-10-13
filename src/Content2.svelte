<script>
    import { onMount } from 'svelte';
    import lang_en from '../server/language/lang-en.json'
    import lang_no from '../server/language/lang-no.json'
    $: greeting = "placeholder"
    
    onMount(() => {
        let language = navigator.language;
        console.log(language);
        if(language === "no" || language === "nb-NO" || language === "nn-NO"){
            greeting = lang_no.greeting;
        }
        else if(language === "en" || language === "en-GB" || language === "en-US"){
            greeting = lang_en.greeting;
        }
        else{
            greeting =="not found"
        }
    });
    
</script>
<h2>{greeting}</h2>