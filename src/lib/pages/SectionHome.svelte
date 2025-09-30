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
    {#if $isMobile}<div class="websitelogo" style="text-align:unset;">{"<krissen.dev/>"}</div>{/if}
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconHome"></div>
    <h3 id="home">This is home/hero section</h3>
    <h4>Build Trust</h4>
    <button>Call to Action</button>
    <p>{$langdataHome}</p>
</div>

<style>
    @import '$lib/layout/pages.css';
    button{background-color: #E65000;}
    button:hover{background-color: aliceblue;}
</style>