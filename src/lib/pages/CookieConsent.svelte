<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import {cookieConsentVisible, sessionPreferences, cookieConsent, 
            cookieState, cssDarkmodeModal,isMobile, cookieModalOverflow} 
            from '$store/store.js';
    import {modalToggleBodyScroll} from '$lib/layout/modal.js'
    import { darkMode } from '$lib/layout/darkmode';
    
    
    $: modalVisibility = $cookieConsentVisible ? 'flex' : 'none';
    function handleToggle(){
        cookieConsentVisible.update(value => {
            //overflow
            modalToggleBodyScroll(value, modalVisibility);
            return !value
        });
    }
    
    function consentToCookie(){
        cookieConsent.update(value => {return true});
    }

    export const cookieBase = "SameSite=Strict;path=/;";
    const expirationValue = "expires=Thu, 01 Jan 1970 00:00:00; GMT;Max-Age=0;"
    const CookieTable=['darkMode', 'lang']
    function deleteCookies(){
        for(let i=0;i<CookieTable.length; i++){
            document.cookie=`${CookieTable[i]}='';${expirationValue} ${cookieBase}`
        }
        cookieState.set(document.cookie);
        cookieConsent.update(value => {return false});
        //currentConsent=get(cookieConsent);  
    }

    
    onMount(()=>{
        cookieState.set(document.cookie);        
    })


//   function toggleBodyScrollable(toggle){
//     //only toggle when in desktop not on mobile
//     if(window.innerWidth > 540){
//       //if true enable, else disable. Scroll ability overflow on body
//       document.body.style.overflow = toggle ? 'visible':'hidden';
//     }

//     //Bad workaround css hack to fix scroll bleed inside mobile burgermenu, Find better fix later?!!
//     //if modalVisibility is true(actually false as it's switching from true->false) set mobileModal.position=fixed
//     else if(modalVisibility){
//         cookieModalOverflow.set("none")
//     }
//     //else if modalVisibility is false(actually true as it's switching from false->true) set mobileModal.position=absolute
//     else if(!modalVisibility){
//         console.log("cookieModalOverflow")
//         cookieModalOverflow.set("block")
//     }
//   }


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