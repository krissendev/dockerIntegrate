<script>
    import { onMount }                      from 'svelte';
    import { get }                          from 'svelte/store';
    import {updateStorePrimitive, updateStoreObject,
        updateStoreBoolToggle, storeMap}    from '$lib/routing/storeHandler.js'
    import {cookieConsentVisible, 
        sessionPreferences, cookieConsent, 
            cookieState, cssDarkmodeModal,
            isMobile, cookieModalOverflow}  from '$store/store.js';
    import {deleteCookies}                  from '$lib/routing/cookieHandler.js'
    import {modalToggleBodyScroll}          from '$lib/layout/modal.js'
    import { darkMode }                     from '$lib/layout/darkmode';
    import {cookieConsentLang}              from '$lib/routing/loadLangData.js'
  import { error } from '@sveltejs/kit';
    
    $: modalVisibility = $cookieConsentVisible ? 'flex' : 'none';
    
    //checks scroll state at toggling modal on
    $:{if(modalVisibility==='flex'){handleModalScroll();}}
    function handleToggle(){
        updateStoreObject(storeMap.cookieConsentVisible, )
        modalToggleBodyScroll($cookieConsentVisible, modalVisibility)
        updateStoreBoolToggle(storeMap.cookieConsentVisible);

    }
    
    function consentToCookie(){
        updateStorePrimitive(storeMap.cookieConsent, true)
        
        //Unique case
        ///store/sessionPreference."darkMode" is reactive as seen with Darkmode.svelte  "$: if($cookieConsent===true){" 
        // /store/sessionPreference."lang is not reactive because URL shall respect session and not override lang cookie
        cookieConsentLang();

        //cookieConsent must be reacted to $cookieConsent for cookie to be updated before cookieState can update
        setTimeout( ()=>{
            updateStorePrimitive(storeMap.cookieState, document.cookie)
        },100);
    }
    
    onMount(()=>{
        updateStorePrimitive(storeMap.cookieState, document.cookie)
        if(document.cookie){updateStorePrimitive(storeMap.cookieConsent, true)}

        //Scroll event for mobile, scrollArrow visibility toggling
        document.querySelector(".navLinks").addEventListener('scroll', handleModalScroll);
        
    })

    function scrollArrow(state){
        
        if(state==="up"){
            document.querySelector(".navMenu").scrollIntoView({ 
                behavior: "smooth", 
                block: "start"
            });
        }
        else if(state==="down"){
            const currentScroll = document.querySelector(".navLinks").scrollTop;
            const totalHeight = document.querySelector(".navLinks").offsetHeight;
            const scrollRatio = currentScroll/totalHeight; 

            //Cookie modal content height is beyond 100vh, thus "down" arrow covers two sections
            if(scrollRatio <0.5){
                document.querySelector(".cookieModalContent").scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start"
                });
            }
            else{
                document.querySelector(".cookieModalContent").scrollIntoView({ 
                    behavior: "smooth", 
                    block: "end"
                });
            }
            
        }
        else{error.log("incorrect use of scrollArrow()");}   
    }
    export function handleModalScroll(){
        if($isMobile){
            const currentScroll = document.querySelector(".navLinks").scrollTop;
            const totalHeight = document.querySelector(".navLinks").offsetHeight;
            const scrollRatio = currentScroll/totalHeight; 
    
            const downArrow = document.querySelector(".downArrow")
            const upArrow = document.querySelector(".upArrow")
            if(scrollRatio>0.3 && scrollRatio<1.3){
                upArrow.classList.remove("hidden")
                downArrow.classList.remove("hidden")
            }
            else if(scrollRatio<0.2){
                upArrow.classList.add("hidden")
                downArrow.classList.remove("hidden")
            }
            else if(scrollRatio>1.5){
                upArrow.classList.remove("hidden")
                downArrow.classList.add("hidden")
            }
        }
        
    }

</script>


<!--Mobile | Scroll inside navLinks on "second page"-->
<div class={`cookieModalContent`}  style="display: {modalVisibility};">    
    <div class={`${$cssDarkmodeModal} cookieModal`}></div>
    {#if !$isMobile}
    
        <button aria-label="Close cookie modal window" class="exitCookieConsent exitBtn" on:click={handleToggle}>
            X
            <span class="visually-hidden">Close cookie window</span><!--Fallback when css disabled-->
        </button>
        
    <!-- Jump up down arrows to section on mobile-->
    {:else if $isMobile}
        <button title="Navigate up in cookie window" class="upArrow arrow" on:click={()=>scrollArrow("up")}>⬆</button>
        <button title="Navigate down in cookie window" class="downArrow arrow" on:click={()=>scrollArrow("down")}>⬇</button>
    {/if}

    <div class="cookieModalText">
        <div style="display:flex">
            <div class="iconCookie icon"></div><h3>Save preferences with Cookies</h3> 
        </div>
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
            <button class="btnAccept" on:click={consentToCookie}>Accept & Enable Cookies</button>
            <button aria-label="Close cookie modal window" class="exitBtn"on:click={handleToggle}>
                Close
                <span class="visually-hidden">cookie window</span><!--Fallback when css disabled-->
            </button><br><br>
        </div>
        <p>By clicking Accept Your browser will remember your current settings, language and darkmode-lightmode styling.</p>
        <br><br><br>
    </div>
</div>



<style>
@import '$lib/layout/nostylefallback.css';
.icon{
    display:flex;
    width:50px;
    margin:3px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
}
.iconCookie{
    background-color:#F79A6B;
    -webkit-mask-image: url('/icons/icon_cookie.svg');
    mask-image: url('/icons/icon_cookie.svg');
  }

.cookieModalText{
    position:fixed; 
    height:100vh;
    top:50px; 
    font-size: larger;
    padding:20px;
    margin:20px;
    overflow-y: auto;
}
.exitBtn{
        background-color: #FF5900;
}
.exitBtn:hover{
        background-color: #F4953E;
}
.exitBtn:active{
        background-color: #F4953E;
}
.exitCookieConsent{
    font-size:x-large;
    position:fixed;
    top:50px; 
    right:0;
    margin: 20px;
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
    font-weight: bold;
    z-index:3;
    padding: 10px 20px;
}
.upArrow{
    top:0;
}
.downArrow{
    bottom:0;
}
.arrow{
    right:50%;
    transform: translateX(50%);
    width:5px;
    height:5px;
    padding:20px;
    z-index:3;
    position:fixed;
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-size:xx-large;
    border:solid;
    border-radius: 50%;
    opacity:80%;
    background-color:#FEE4D7;
    border-color:#FF5900;
    color:#FF5900;
}
.arrow:active{
    background-color: #FF5900;
    border-color: #F4953E;
    opacity:70%;
}
.btnDelete{background-color:crimson;}
.btnAccept{background-color:limegreen}
.btnDelete:hover{background-color:indianred}
.btnAccept:hover{background-color:lightgreen}
.btnDelete:active{background-color:indianred}
.btnAccept:active{background-color:lightgreen}

@media screen and (max-width: 540px) {
    .cookieModalText, .cookieModalContent, .cookieModal{
    width:100vw;
    overflow-x: hidden;
  }
    .cookieModalContent{
        display:flex;
        background-color: none;
    }
    .cookieModal{
        height:auto;
    }
    .cookieModalText{
        position:static;
        height:auto;    
    }
}

/*toggling class for style visibility, used for arrows*/
.hidden{
    visibility: hidden;
}
</style>