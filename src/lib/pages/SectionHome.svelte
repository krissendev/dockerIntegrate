<script>
    import {langdataHome, cssDarkmodeModal, 
        isMobile }                          from '$store/store.js';
        
        import { onMount }                      from 'svelte';
        onMount(()=>{
            console.log($isMobile)
        })
        
        // let mobile= getStoreValue(isMobile)
</script>
<div class="pageSection homeSvelte">
    {#if $isMobile}<div class="websitelogo" style="text-align:unset;"><h1>{"<krissen.dev/>"}</h1></div>{/if}
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconHome"></div>
    <h2 id="home">This is home/hero section</h2>
    <h3>Build Trust</h3>
    <button title="call to action">Call to Action</button>
    <p>{$langdataHome}</p>
</div>

<style>
    @import '$lib/layout/pages.css';
</style>