<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount}                        from 'svelte';
    import {isMobile,cssDarkmodeModal,
            cookieModalOverflow,
            langdataNav        }            from '$store/store.js';
    import {updateStorePrimitive, storeMap} from '$lib/routing/storeHandler.js'
    import {toggleBurger, initOnMount}      from '$lib/layout/nav.js'
    import BtnDarkmode                      from './BtnDarkmode.svelte'
    import BtnSaveCookie                    from './BtnSaveCookie.svelte'
    import BtnFlags                         from './BtnFlags.svelte'
    import ModalCookieConsent               from './ModalCookieConsent.svelte'

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
    



    //Dynamic UI
    //JSON
    $: navdata = $langdataNav;
</script>

<div class="topNav"><!--Top Nav-->
    <!--class={`${$cssDarkmodeModal} navLinks`}-->
    <div class={`${$cssDarkmodeModal} navLinks`} bind:this={elLinks}>
        <div class="navMenu" bind:this={elNavMenu}>
            <a href="#home">
                <!-- {navdata.home.label} -->
                <span class="nav_icon navHome"></span>{#if navdata?.home}{navdata.home.label}{/if}
            </a>
            <a href="#projects">
                <span class="nav_icon navProjects"></span>{#if navdata?.project}{navdata.project.label}{/if}
            </a>
            <a href="#about">
                <span class="nav_icon navAbout"></span>{#if navdata?.about}{navdata.about.label}{/if}
            </a>
            <a href="#contact">
                <span class="nav_icon navContact"></span>{#if navdata?.contact}{navdata.contact.label}{/if}
            </a>          
            <!-->Some divider-->
            <div class="navDividerLine" bind:this={elDivider}></div>
            <div class="navSettings" bind:this={elSettings}>
                <BtnDarkmode/>
                <BtnFlags/>
                <BtnSaveCookie/>
            </div>
        </div>
        <!--Cookie Modal-->
        <ModalCookieConsent/>
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