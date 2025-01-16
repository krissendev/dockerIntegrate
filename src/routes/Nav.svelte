<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount} from 'svelte';
    import {toggleBurger, initOnMount} from '$lib/layout/nav.js'
    import Darkmode from './Darkmode.svelte'
    import SaveCookie from './SaveCookie.svelte'
    import CookieConsent from './CookieConsent.svelte'
    let elMainMenu  ;
    let elLinks;
    let elMobileModal;
    let elCookieModal;

    //nav resize depends on 'browser', which only is available after mount
    onMount(()=>{
        initOnMount(elLinks, elMainMenu, elMobileModal);
    })
    


    function handleToggle(){
        toggleBurger (elLinks, elMobileModal, elMainMenu);
    }
</script>

<div class="topNav"><!--Top Nav-->
    <div class="navLinks" bind:this={elLinks}>
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>    
      <div class="navDividerLine"></div><!-->Some divider-->
      <a href="/">Aa</a>
      <Darkmode/>
      <SaveCookie/>
    </div>

    <div name="mobileModal" class="modal" bind:this={elMobileModal}></div><!--Mobile Modal-->
    <div name="cookieConsentModal" class="modal" bind:this={elCookieModal}>
        <CookieConsent/>
    </div><!--Cookie Modal-->
    <button aria-hidden="true" class="burger" on:click={handleToggle} bind:this={elMainMenu}>
        <div></div><div></div>
        <div></div>
    </button><!--Burger Menu -->
 
 </div> 

<style>
    @import '$lib/layout/nav.css';
</style>