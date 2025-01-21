<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount} from 'svelte';
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
    let elCookieModal;  //WIP Cookie modal

    //nav resize depends on 'browser', which only is available after mount
    onMount(()=>{
        initOnMount(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal);
    })
    


    function handleToggle(){
        toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu);
    }
</script>

<div class="topNav"><!--Top Nav-->
    <div class="navLinks" bind:this={elLinks}>
        <div class="navMenu" bind:this={elNavMenu}>
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>          
        </div>
        <!-->Some divider-->
        <div class="navDividerLine" bind:this={elDivider}></div>
        <div class="navSettings" bind:this={elSettings}>
            <a href="/">Aa</a>
            <Darkmode/>
            <Flags/>
            <SaveCookie/>
        </div>
    </div>

    <div name="mobileModal" class="modal" bind:this={elMobileModal}></div><!--Mobile Modal-->
    <div name="cookieConsentModal" class="modal" bind:this={elCookieModal}>
        <CookieConsent/>
    </div><!--Cookie Modal-->
    <button aria-hidden="true" class="burger" on:click={handleToggle} bind:this={elMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
    </button><!--Burger Menu -->
 
 </div> 

<style>
    @import '$lib/layout/nav.css';
</style>