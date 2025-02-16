<script>
    import {onMount} from 'svelte'

    import {languageInitOnMount, loadLanguage} from '$lib/layout/langLoad.js'
    import jsonfile from '$lib/language.json';
    import {langdataHome, langdataHome1, langdataAbout, langdataProject, langdataContact, sessionPreferences} from '$store/store.js';

    onMount(()=>{
        loadLanguage();
    })

</script>
