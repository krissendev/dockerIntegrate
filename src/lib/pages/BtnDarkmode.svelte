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
<button title="Toggle darkmode" aria-label="dark mode set to {darkMode}" class="darkMode {darkMode?"dark":"light"}" on:click={darkModeSwitch}> 
    <span class="visually-hidden">Darkmode</span><!--Fallback when css disabled-->
</button>
<style>
    @import '$lib/layout/nostylefallback.css';
    .darkMode:hover{
        background-color:#F4953E;
        border:4px solid #F4953E;
    }
    .darkMode:active{
        background-color:#F4953E;
        border:4px solid #F4953E;
    }
    .darkMode{
        display:inline-block;
        height:30px;
        width:30px;
        margin:3px;
        background-color:#FF5900;
        border:4px solid #FF5900;
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

