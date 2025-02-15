<script>
    import {onMount} from 'svelte'
    import { get } from 'svelte/store';
    import {languageInitOnMount} from '$lib/layout/langLoad.js'
    import jsonfile from '$lib/language.json';

    import {langdataHome, langdataHome1, langdataAbout, langdataProject, langdataContact, sessionPreferences} from '$store/store.js';

    let cookieLang = '';
    export let languageContent;

    //Language Priority
    //URL
    //Cookie
    //BrowserSetting
    //En


    ///routes/LangLoad.svelte handles "/"
    ///routes/[...slug]/+page.js handles "/other"

    let language;

    onMount(()=>{
        loadLanguage();
    })

    async function loadLanguage(){
        language = $sessionPreferences.lang;

        //cookieLang = await languageInitOnMount();
        //cookieLang="no";//
        //if cookieLang has value "lang"
        if(language){
            console.log("cookie lang:", language)
            languageContent =await jsonfile[language].content;
            
            //length iterator into store ?
            const langContentHome1 = await jsonfile[language].home;
            const langContentAbout = await jsonfile[language].about;
            const langContentProject = await jsonfile[language].project;
            const langContentContact = await jsonfile[language].about;

            console.log(langContentAbout)

            langdataHome1.set(langContentHome1)
            langdataAbout.set(langContentAbout) 
            langdataProject.set(langContentProject)
            langdataContact.set(langContentContact)

            langdataHome.set(languageContent)
        }
    }
</script>
<h3>Lang</h3>
<h3>{languageContent}</h3>