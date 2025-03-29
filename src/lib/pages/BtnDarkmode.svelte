<script>
    import {onMount}                        from 'svelte';
    import {sessionPreferences, 
        cookieConsent}                      from '$store/store.js';
    import {darkModeSwitch, initOnMount, 
        cookieConsentDarkmode}              from '$lib/layout/darkmode.js'
    import {updateStorePrimitive, updateStoreObject,
     storeMap, getStoreValue}               from '$lib/routing/storeHandler.js'
    
    $: if($cookieConsent===true){
        cookieConsentDarkmode();
    }
    $: darkMode = $sessionPreferences["darkMode"];
    
    onMount(()=>{
        initOnMount();
    })

</script>
<button aria-label="dark mode" class="navLinkBtn" on:click={darkModeSwitch}> 
    <div class="darkMode {darkMode?"dark":"light"}"></div></button>
<style>
    .navLinkBtn:hover .darkMode{background-color: white;}
    .darkMode{
        display:inline-block;
        height:30px;
        width:30px;
        margin:3px;
        background-color:cornflowerblue;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-position: center;
        mask-position: center;
    }

    .dark{
        -webkit-mask-image: url('/icons/icon_moon.svg');
        mask-image: url('/icons/icon_moon.svg');
    }
    .light{
        transform: translate(0%, 0%) scale(1.3);
        -webkit-mask-image: url('/icons/icon_sun.svg');
        mask-image: url('/icons/icon_sun.svg');
    }
</style>

