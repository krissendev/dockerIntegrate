<script>
    import {onMount} from 'svelte';
    import {darkModeSwitch, initOnMount} from '$lib/layout/darkmode.js'
    
    //DELETE THIS!!! Experimental
    let isVisited = false
    
    onMount(()=>{
        initOnMount();
    })


</script>
<button class="navLinkBtn" on:click={darkModeSwitch}> Darkmode</button>

