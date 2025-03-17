<script>
    import { onMount }                      from 'svelte';
    import { goto }                         from '$app/navigation';
    import {sessionPreferences, 
        cookieConsent, cookieState}         from '$store/store.js';
    import {updateStoreObject, storeMap,
        updateStorePrimitive}               from '$lib/routing/storeHandler.js'
    import {getCookieValue, 
        documentSetCookie}                  from '$lib/routing/cookieHandler.js'
    import { loadLanguage}                  from '$lib/routing/loadLangData.js' 

    
    //const languageCode = navigator.language; //FIX post onMount
    // const languageCode = "en"
    let selectedLanguageBtn;
    let languageList;
    let languageLinkEn;
    let languageLinkNo;
    let languageLinkDe;
    let selectedLanguageFlag;
    let selectedLanguageText;

    let languageClass=""
    

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

    $: language = $sessionPreferences.lang;
    onMount(() => {

        checkForCookie();

        setLanguage(language)
        

        //inline value for button toggle
        selectedLanguageBtn.value = "false";

        languageClass = `flag_icon ${language}`
        
        let langText = language.slice(0,1).toUpperCase()+language.slice(1) //Capitalize 1st letter
        selectedLanguageText.innerHTML = `${langText}`


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
            toggleLanguage("en")
        })
        languageLinkNo.addEventListener('click', ()=>{
            toggleLanguage("no")
        })
        languageLinkDe.addEventListener('click', ()=>{
            toggleLanguage("de")
        })


        function toggleLanguage(lang){
            languageClass = `flag_icon ${lang}`;
            let langText = lang.slice(0,1).toUpperCase()+lang.slice(1) //Capitalize 1st letter
            selectedLanguageText.innerHTML = langText;
            console.log("lang:",lang,typeof(lang))

            //deselect dropdown
            selectedLanguageBtn.value = false;
            selectedLanguageBtn.style.backgroundColor = null;
            languageList.style.visibility = "hidden";

            //update content
            setLanguage(lang)

            if($cookieConsent){
                documentSetCookie("lang", lang)
                updateStorePrimitive(storeMap.cookieState, document.cookie)
            }
        }
    })

    function setLanguage(language){
        //update url
        updateStoreObject(storeMap.sessionPreferences, "lang", language)
        
        //update store data $lib/routing/loadLangData.js
        loadLanguage();

        //placeholder /en /no , get url and map #, /[...slug], /[lang] etc afterwards
        console.log("Flags onMount url calling goto()", language)
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash
        if(language){
            goto(`/${language}${currentHash}`);
        }
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
            <span class="language-name">En</span>
        </li>
        <li data-value="no" bind:this={languageLinkNo}>
            <span class="flag_icon no"></span>
            <span class="language-name">No</span>
        </li>
        <li data-value="no" bind:this={languageLinkDe}>
            <span class="flag_icon de"></span>
            <span class="language-name">De</span>
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
        display: flex;
        margin:0px;
        padding:0px;
        border:0px;
    }
    #language_selected {
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color:cornflowerblue;
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
        background-image: url('/flags/flag_en.svg');
    }
    .no {
        background-image: url('/flags/flag_no.svg');
    }
    .de {
        background-image: url('/flags/flag_de.svg');
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
        font-size: 1rem;
    }
    #languageList li:hover {
        background-color: #f4f4f4;
    }

</style>