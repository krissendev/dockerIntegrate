<script>
    import {onMount} from 'svelte'

    import {languageInitOnMount, loadLanguage} from '$lib/routing/loadLangData.js'
    import jsonfile from '$lib/language.json';
    import {langdataHome, langdataAbout, langdataProject, langdataContact, sessionPreferences} from '$store/store.js';

    onMount(()=>{
        loadLanguage();
    })

</script>
