<script>
    import {onMount}                        from 'svelte';
    import {sessionPreferences, 
        cookieConsent}                      from '$store/store.js';
    import {darkModeSwitch, initOnMount, 
        cookieConsentDarkmode}              from '$lib/layout/darkmode.js'
    
    $: if($cookieConsent===true){
        cookieConsentDarkmode();
    }
    
    onMount(()=>{
        initOnMount();
    })

</script>
<button class="navLinkBtn" on:click={darkModeSwitch}> Darkmode</button>

