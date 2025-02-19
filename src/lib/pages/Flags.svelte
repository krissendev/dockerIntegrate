<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import {sessionPreferences} from '$store/store.js';
    import {updateStoreObject, storeMap}from '$lib/routing/storeHandler.js'
    import {getCookieValue} from '$lib/routing/cookieHandler.js'
    import { loadLanguage} from '$lib/routing/loadLangData.js' 

    
    //const languageCode = navigator.language; //FIX post onMount
    const languageCode = "en"
    let selectedLanguageBtn;
    let languageList;
    let languageLinkEn;
    let languageLinkNo;
    let selectedLanguageFlag;
    let selectedLanguageText;

    let languageClass=""
    let language;

    const languageMap = {
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'en-AU': 'en',
    'no': 'no',
    'nb-NO': 'no',
    'nn-NO': 'no'
    };

    // let value;
    // $: value = $language;

    onMount(() => {
        checkForCookie();


        //inline value for button toggle
        selectedLanguageBtn.value = "false";

        //default flag selected
        language = languageMap[languageCode];
        
        setLanguage(languageCode)

        //dispatch('update', event.target.value);

        languageClass = `flag_icon ${language}`
        selectedLanguageText.innerHTML = `${language}`


        selectedLanguageBtn.addEventListener('click', ()=>{
            //Toggle, switch bool of the "language_selected" button
            let languageSelectorToggle = JSON.parse(selectedLanguageBtn.value); //bool
            languageSelectorToggle = !languageSelectorToggle;
            selectedLanguageBtn.value = languageSelectorToggle;
    
            //toggling language "optionsContainer"
            if(languageSelectorToggle == true){
                //selected styling on the "language_selected"
                selectedLanguageBtn.style.backgroundColor  = "#d3d3d3";
                languageList.style.visibility = "visible";
            }
            else if (languageSelectorToggle == false){
                //selected styling on the "language_selected"
                selectedLanguageBtn.style.backgroundColor = null;
                languageList.style.visibility = "hidden";
            }
        })

        //List href to local language page
        languageLinkEn.addEventListener('click', ()=>{
            languageClass = `flag_icon en`;
            selectedLanguageText.innerHTML = `en`;
            language = `en`;

            //deselect dropdown
            selectedLanguageBtn.value = false;
            selectedLanguageBtn.style.backgroundColor = null;
            languageList.style.visibility = "hidden";
            
            //update content
            setLanguage(language)

            // const newUrl = `${window.location.pathname}/lang/en`;
            // window.history.pushState(null, '', newUrl);
        })
        languageLinkNo.addEventListener('click', ()=>{
            languageClass = `flag_icon no`;
            selectedLanguageText.innerHTML = `no`;
            language = `no`;

            //deselect dropdown
            selectedLanguageBtn.value = false;
            selectedLanguageBtn.style.backgroundColor = null;
            languageList.style.visibility = "hidden";

            //update content
            setLanguage(language)

            // const newUrl = `${window.location.pathname}/lang/no`;
            // window.history.pushState(null, '', newUrl);

            // const urlParams = new URLSearchParams(window.location.search);
            // const lang = urlParams.get('lang'); // returns 'en'

        })

    })

    function setLanguage(language){
        //update url
        updateStoreObject(storeMap.sessionPreferences, "lang", language)
        
        //update store data $lib/routing/loadLangData.js
        loadLanguage();

        //placeholder /en /no , get url and map #, /[...slug], /[lang] etc afterwards
        goto(`/${language}`);
    }


    //Temporary solution, refactor getCookieValue out from darkmode.js
    function checkForCookie(){
        const cookieLang = getCookieValue("lang")
        updateStoreObject(storeMap.sessionPreferences, "lang", cookieLang)
    }
</script>
<!-- <textarea bind:value={language}></textarea> -->

<div id="language_selector">
    <button aria-label="language dropdown menu button"id="language_selected" bind:this={selectedLanguageBtn} >
        <div class={languageClass} bind:this={selectedLanguageFlag}></div> 
        <span class="text_selected" bind:this={selectedLanguageText}></span> 
        <span class="arrow-icon"></span> 
    </button>
    <ul id="languageList" style="visibility:hidden" bind:this={languageList}>
        <li data-value="en" bind:this={languageLinkEn}>
            <span class="flag_icon en"></span>
            <span class="language-name">en</span>
        </li>
        <li data-value="no" bind:this={languageLinkNo}>
            <span class="flag_icon no"></span>
            <span class="language-name">no</span>
        </li>
    </ul>
</div>

<style>
    .flag_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    /*Language picker container*/
    #language_selector {
        position: relative;
        display: inline-block;
        margin:0px;
        padding:0px;
        border:0px;
    }
    #language_selected {
        display: flex;
        align-items: center;
        cursor: pointer;
        /* padding: 5px 10px; */
        /* border: 1px solid #000000; */
        /* border-radius: 5px; */
        background-color: #a0a0a0;
        /* font-size: 14px; */
    }
    #language_selected:hover{
        background-color: #c1c1c1;
    }
    .arrow-icon {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: auto;
        border-style: solid;
        border-width: 5px 1px 2px 4px;
        clip-path: polygon(100% 0, 50% 50%, 100% 100%);
        border: 5px solid rgb(0, 0, 0);
    }

    /*Language Options*/
    .flag_icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    
    .en {
        background-image: url('../flags/flag_en.svg');
    }
    .no {
        background-image: url('../flags/flag_no.svg');
    }
    
    
    #languageList {
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0;
        right: 0;
        padding: 0;
        margin: 0;
        list-style: none;
        background-color: #fff;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 5px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
        max-height: 150px;
        overflow-y: auto;
    }
    #languageList li {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 14px;
    }
    #languageList li:hover {
        background-color: #f4f4f4;
    }

</style>