<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount} from 'svelte';
    import {isMobile,cssDarkmodeModal,cookieModalOverflow} from '$store/store.js';
    import {updateStorePrimitive, storeMap}from '$lib/routing/storeHandler.js'
    import {toggleBurger, initOnMount} from '$lib/layout/nav.js'
    import Darkmode from './Darkmode.svelte'
    import SaveCookie from './SaveCookie.svelte'
    import CookieConsent from './CookieConsent.svelte'
    import Flags from './Flags.svelte'

    let elLinks;        //Container for Nav content
    let elNavMenu;      //#home, #about etc...
    let elDivider;      // dividing graphics
    let elSettings;     // Aa, Darkmode, Language, cookies

    let elMobileMenu  ; //BurgerMenu
    let elMobileModal;  //Modal overlay when burger menu toggled

    //nav resize depends on 'browser', which only is available after mount
    onMount(()=>{
        updateStorePrimitive(storeMap.isMobile, window.screen.width < 540)
        //window.screen.width;
        initOnMount(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal);
    })

    //Burger toggle on mobile only
    function handleToggle(){
        toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu);
    }
    
</script>

<div class="topNav"><!--Top Nav-->
    <!--class={`${$cssDarkmodeModal} navLinks`}-->
    <div class={`${$cssDarkmodeModal} navLinks`} bind:this={elLinks}>
        <div class="navMenu" bind:this={elNavMenu}>
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>          
            <!-->Some divider-->
            <div class="navDividerLine" bind:this={elDivider}></div>
            <div class="navSettings" bind:this={elSettings}>
                <a href="/">Aa</a>
                <Darkmode/>
                <Flags/>
                <SaveCookie/>
            </div>
        </div>
        <!--Cookie Modal-->
        <CookieConsent/>
    </div>

    <!--class={`${$cssDarkmodeModal} modal`}-->
    <!--Mobile Modal-->
    <div name="mobileModal" class={`${$cssDarkmodeModal} modal`} style={`display:${$cookieModalOverflow}`} bind:this={elMobileModal}></div> 

    
    <button aria-hidden="true" class="burger" on:click={handleToggle} bind:this={elMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
    </button><!--Burger Menu -->
 
 </div> 

<style>
    @import '$lib/layout/nav.css';
</style>