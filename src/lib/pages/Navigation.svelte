<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount}                        from 'svelte';
    import {isMobile,cssDarkmodeModal,
            cookieModalOverflow,
            langdataNav,
            sessionPreferences}             from '$store/store.js';
    import {updateStorePrimitive, storeMap,
            getStoreValue}                  from '$lib/routing/storeHandler.js'
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
    let topNav;         //Outer Menu container for consistent display across mobile and desktop

    $: darkMode = $sessionPreferences["darkMode"];

    //nav resize depends on 'browser', which only is available after mount
    onMount(()=>{
        updateStorePrimitive(storeMap.isMobile, window.screen.width < 540)
        //window.screen.width;
        initOnMount(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal, topNav);
    })

    //Burger toggle on mobile only
    function handleToggle(){
        toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu, undefined, topNav);
    }
    function closeBurger(){
        let mobile= getStoreValue(isMobile)
        if(mobile){toggleBurger(elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu, true, topNav);}
    }



    //Dynamic UI
    //JSON
    $: navdata = $langdataNav;
</script>

<div class={`${$cssDarkmodeModal} topNav`} bind:this={topNav}><!--Top Nav-->
    <!--class={`${$cssDarkmodeModal} navLinks`}-->
    <button title="Navigation menu" aria-label="Navigation menu" class="burger" on:click={handleToggle} bind:this={elMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
        <span class="visually-hidden">☰</span><!--Fallback when css disabled-->
    </button><!--Burger Menu -->    
    
    <nav class={`${$cssDarkmodeModal} navLinks`} aria-label="Main" bind:this={elLinks}>
        <div class="navMenu" bind:this={elNavMenu}>
            <a href="#home" on:click={closeBurger} style="text-decoration: none;"><div class=" {darkMode?"dark":"light"}">{"<krissen.dev/>"}</div></a>            
            <a href="#home" on:click={closeBurger}>
                <span class="nav_icon navHome"></span>{#if navdata?.home}{navdata.home.label}{/if}
            </a>
            <a href="#projects" on:click={closeBurger} >
                <span class="nav_icon navProjects"></span>{#if navdata?.project}{navdata.project.label}{/if}
            </a>
            <a href="#about" on:click={closeBurger} >
                <span class="nav_icon navAbout"></span>{#if navdata?.about}{navdata.about.label}{/if}
            </a>
            <a href="#contact" on:click={closeBurger} >
                <span class="nav_icon navContact"></span>{#if navdata?.contact}{navdata.contact.label}{/if}
            </a>
            <!--Some divider-->
            <!-- <div class="navDividerLine" bind:this={elDivider}></div> -->
            <div class="navSettings" bind:this={elSettings}>
                <BtnDarkmode/>
                <BtnFlags/>
                <BtnSaveCookie/>
            </div>
        </div>
        <!--Cookie Modal-->
        <ModalCookieConsent/>
    </nav>

    <!--class={`${$cssDarkmodeModal} modal`}-->
    <!--Mobile Modal-->
    <div name="mobileModal" class={`${$cssDarkmodeModal} modal`} style={`display:${$cookieModalOverflow}`} bind:this={elMobileModal}></div> 

    

 
</div>
<style>
    @import '$lib/layout/navigation.css';
    @import '$lib/layout/nostylefallback.css';
</style>