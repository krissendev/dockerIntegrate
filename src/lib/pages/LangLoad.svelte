<script>
    import {onMount} from 'svelte'

    import {languageInitOnMount, loadLanguage,cookieConsentLanguage} from '$lib/routing/loadLangData.js'
    import jsonfile from '$lib/language.json';
    import {langdataHome, langdataAbout, langdataProject, langdataContact, sessionPreferences, cookieConsent} from '$store/store.js';


    onMount(()=>{
        loadLanguage();
    })

</script>
