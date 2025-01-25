<script>
    import { onMount } from 'svelte';
    import {cookieConsentVisible } from '$store/store.js';
  import { darkMode } from '$lib/layout/darkmode';
    
    

    $: visibility = $cookieConsentVisible ? 'visible' : 'hidden';
    function handleToggle(){
        cookieConsentVisible.update(value => !value);
    }

    export const cookieBase = "SameSite=Strict;path=/;";
    const expirationValue = "expires=Thu, 01 Jan 1970 00:00:00; GMT;Max-Age=0;"
    const CookieTable=['darkMode', 'lang']
    function deleteCookies(){
        for(let i=0;i<CookieTable.length; i++){
            document.cookie=`${CookieTable[i]}='';${expirationValue} ${cookieBase}`
        }
        currentCookieString = document.cookie;
    }
    
    $: currentCookieString = ""
    onMount(()=>{
        currentCookieString = document.cookie;
    })
</script>

<div class="cookieModalContent" style="visibility: {visibility};">    
    <div class="cookieModal"></div>
    <button aria-label="Close Modal Window" class="exitCookieConsent" on:click={handleToggle}>X</button>
    <div class="cookieModalText">
        <h3>Save preferences with Cookies</h3>
        <p>We respect your data and right to privacy. Our website does not collect nor track your personal data and has no cookies enabled by default.<br>
            All cookies, if enabled by you, are stored on your local device only and are used solely to remember settings of your choosing, enhancing your user experience.<br>
            This website does not track your cookies, nor do any third parties.<br>
            Below, you can view your current cookies, remove them, or choose to enable them. By toggling  cookies, you explicitly consent to the storage and use of cookies on your local device for the stated purposes. <br>
            You can also choose not to enable any cookies.<br>
            Cookies enabled by you will remain on your device for [specify duration], unless removed by you.</p>
        <p>Your Current unsaved Settings:</p>    
        <p>Your Current Cookies: " {currentCookieString} "<br>
            <button class="btnDelete" on:click={deleteCookies}>Delete All Cookies</button>
        </p>
        <br>

        <div>
            <button class="btnAccept">Accept & Enable Cookies</button> <button on:click={handleToggle}>Close</button><br><br>
            By clicking Accept Your browser will remember your current settings, language and darkmode-lightmode styling.
        </div>
    </div>
</div>



<style>
.cookieModalText{
    position:fixed;
    top:50px;
    left:0;
    font-size: larger;
    padding:20px;
    margin:20px;
    background-color:white;
}

.exitCookieConsent{
    font-size:x-large;
    position:fixed;
    right:0;
    margin: 5px;
    /* width:40px;
    height:40px; */
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
    background-color: blue;
    opacity:90%;
}
button{
    padding: 10px 20px;
}
.btnDelete{background-color:red;}
.btnAccept{background-color:lightgreen;}
</style>