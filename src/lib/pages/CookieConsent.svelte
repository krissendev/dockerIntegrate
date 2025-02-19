<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import {updateStorePrimitive, updateStoreObject,updateStoreBoolToggle, storeMap}from '$lib/routing/storeHandler.js'
    import {cookieConsentVisible, sessionPreferences, cookieConsent, 
            cookieState, cssDarkmodeModal,isMobile, cookieModalOverflow} 
            from '$store/store.js';
    import {deleteCookies} from '$lib/routing/cookieHandler.js'
    import {modalToggleBodyScroll} from '$lib/layout/modal.js'
    import { darkMode } from '$lib/layout/darkmode';
    
    
    $: modalVisibility = $cookieConsentVisible ? 'flex' : 'none';
    function handleToggle(){
        updateStoreObject(storeMap.cookieConsentVisible, )
        modalToggleBodyScroll($cookieConsentVisible, modalVisibility)
        updateStoreBoolToggle(storeMap.cookieConsentVisible);

    }
    
    function consentToCookie(){
        updateStorePrimitive(storeMap.cookieConsent, true)
        
        //cookieConsent must be reacted to $cookieConsent for cookie to be updated before cookieState can update
        setTimeout( ()=>{
            updateStorePrimitive(storeMap.cookieState, document.cookie)
        },100);
    }
    
    onMount(()=>{
        updateStorePrimitive(storeMap.cookieState, document.cookie)
    })

</script>


<!--Mobile | Scroll inside navLinks on "second page"-->
<div class={` cookieModalContent`}  style="display: {modalVisibility};">    
    <div class={`${$cssDarkmodeModal} cookieModal`}></div>
    {#if !$isMobile}
        <button aria-label="Close Modal Window" class="exitCookieConsent" on:click={handleToggle}>X</button>
    {/if}
    <div class="cookieModalText">
        <h3>Save preferences with Cookies</h3>
        <p>We respect your data and right to privacy. Our website does not collect nor track your personal data and has no cookies enabled by default.<br>
            All cookies, if enabled by you, are stored on your local device only and are used solely to remember settings of your choosing, enhancing your user experience.<br>
            This website does not track your cookies, nor do any third parties.<br>
            Below, you can view your current cookies, remove them, or choose to enable them. By toggling  cookies, you explicitly consent to the storage and use of cookies on your local device for the stated purposes. <br>
            You can also choose not to enable any cookies.<br>
            Cookies enabled by you will remain on your device for [specify duration], unless removed by you.</p>
        <p>Your Current unsaved Settings: " {JSON.stringify($sessionPreferences)} "</p>    
        <p>Your Current Cookies: " {$cookieState} "<br>
            <button class="btnDelete" on:click={deleteCookies}>Disagree & Delete Cookies</button>
        </p>
        <!-- <p>Are you consenting?;{currentConsent}</p> -->
        <br>

        <div>
            <button class="btnAccept" on:click={consentToCookie}>Accept & Enable Cookies</button> <button on:click={handleToggle}>Close</button><br><br>
            By clicking Accept Your browser will remember your current settings, language and darkmode-lightmode styling.
        </div>
    </div>
</div>



<style>
.cookieModalText{
    position:fixed; 
    height:100vh;
    top:50px;
    left:0;
    font-size: larger;
    padding:20px;
    margin:20px;
}

.exitCookieConsent{
    font-size:x-large;
    position:fixed;
    right:0;
    margin: 5px;
    z-index:3;
}
.cookieModalContent{
    position:absolute;
    z-index: 2;
}    
.cookieModal{
    /* z-index: 3; */
    position:absolute;
    left:0;
    top:0;
    width:100vw;
    height:100vh;
}
button{
    z-index:3;
    padding: 10px 20px;
}
.btnDelete{background-color:red;}
.btnAccept{background-color:lightgreen;}


@media screen and (max-width: 540px) {
    .cookieModalContent{
        display:flex;
        background-color: none;
    }
    .cookieModal{
        height:auto;
    }
    .cookieModalText{
        position:static;
    }
}
</style>