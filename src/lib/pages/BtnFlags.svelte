<script>
    import { onMount }                      from 'svelte';
    import { goto }                         from '$app/navigation';
    import {sessionPreferences, 
        cookieConsent, cookieState,
     cssDarkmodeModal}                      from '$store/store.js';
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
    let mobileActive=""

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
                // selectedLanguageBtn.style.backgroundColor  = "#d3d3d3";
                languageList.style.visibility = "visible";

                if(window.outerWidth<540){
                    mobileActive="active";
                }
                else{mobileActive="";}

            }
            else if (languageSelectorToggle == false){
                //selected styling on the "language_selected"
                // selectedLanguageBtn.style.backgroundColor = null;
                languageList.style.visibility = "hidden";
                mobileActive="";
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
            
            mobileActive="";
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

        //language redirect while retaining rest of the url path
        const currentPath = window.location.pathname + window.location.hash;
        let pathSegments = currentPath.split(/(?=[#/])/);
        const reconstructerPath = "".concat(...pathSegments.slice(1));//removes 1 entry which is for language
        if(language){
            goto(`/${language}`+ reconstructerPath);
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
    <!-- <img title="image"src="" alt="" style="width:100px;height:100px;"> -->
    <button title="Change language"aria-label="language dropdown menu button"id="language_selected" bind:this={selectedLanguageBtn} >
        <div class={languageClass} bind:this={selectedLanguageFlag}></div> 
        <span class="text_selected" bind:this={selectedLanguageText}></span> 
        <span class="arrow-icon"></span> 
    </button>
    <ul id="languageList" class={`${$cssDarkmodeModal} ${mobileActive}`} style="visibility:hidden" bind:this={languageList}>
        <button title="English" data-value="en" bind:this={languageLinkEn}>
            <span class="flag_icon en"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>En</span>
        </button>
        <button title="Norsk" data-value="no" bind:this={languageLinkNo}>
            <span class="flag_icon no"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>No</span>
        </button>
        <button title="Deutsch" data-value="no" bind:this={languageLinkDe}>
            <span class="flag_icon de"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>De</span>
        </button>            
        <!-- <li data-value="en" bind:this={languageLinkEn}>
            <span class="flag_icon en"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>En</span>
        </li> -->
        <!-- <li data-value="no" bind:this={languageLinkNo}>
            <span class="flag_icon no"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>No</span>
        </li>
        <li data-value="no" bind:this={languageLinkDe}>
            <span class="flag_icon de"></span>
            <span class={`${$cssDarkmodeModal} language-name`}>De</span>
        </li> -->
    </ul>
</div>

<style>
    /*Language Options*/
    .flag_icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin: 0px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    /*Language picker container*/
    #language_selector {
        position: relative;
        display: flex;
        margin:5px;
        padding:0px;
        border:0px;
    }
    #language_selected {
        display: flex;
        align-items: center;
        cursor: pointer;
        /* background-color: #F4953E; */
        border: 4px none #FF5900;
    }

    #language_selected:hover{
        background-color: #F4953E;
        border-color:#F4953E;
    }
    .arrow-icon {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: auto;
        border-style: solid;
        /* border-width: 5px 1px 2px 4px; */
        clip-path: polygon(100% 0, 10% 50%, 100% 100%);
        border: 5px solid #FF5900;
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
        border: 4px solid #FF5900;
        border-top: none;
        border-radius: 5px;
        max-height: 150px;
        overflow-x:hidden;
        overflow-y: auto;
    }
    #languageList button {
        display: flex;
        align-items: center;
        padding: 0px 3px 0px 3px;
        cursor: pointer;
        font-size: 1rem;
        color:black;
    }
    #languageList button:hover {
        background-color: #FF5900;
    }
@media screen and (max-width: 540px) {
    #languageList{display:none;}
    #languageList.active {
        display:flex;
        position:static;
        overflow-x:auto;
        overflow-y:hidden;
        top:initial;
        right:initial;
    }
}
</style>