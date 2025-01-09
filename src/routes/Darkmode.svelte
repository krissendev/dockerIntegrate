<script>
    import {onMount} from 'svelte';
    import {darkModeSwitch, initOnMount} from '$lib/layout/darkmode.js'
    onMount(()=>{
        initOnMount();
    })
</script>

<button on:click={darkModeSwitch}> Darkmode</button>