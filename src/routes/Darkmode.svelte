<script>
    import {onMount} from 'svelte';
    import {sessionPreferences, cookieConsent} from '$store/store.js';
    import {darkModeSwitch, initOnMount} from '$lib/layout/darkmode.js'
    
    //DELETE THIS!!! Experimental
    let isVisited = false
    
    $: if($cookieConsent){
        initOnMount();
    }
    

    onMount(()=>{
        initOnMount();
    })


</script>
<button class="navLinkBtn" on:click={darkModeSwitch}> Darkmode</button>

