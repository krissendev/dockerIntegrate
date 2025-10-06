<script>
    import {onMount}                    from 'svelte'
        import {langdataAbout, 
            cssDarkmodeModal }              from '$store/store.js';
        import Portrait                  from './Portrait.svelte'
    let imgWidth = 0;
    let gl=undefined;
    onMount(()=>{
        imgWidth=window.innerWidth/2;
        
        //Check for webgl for fallback
        let canvas = document.querySelector("#webglInit")
        gl = canvas.getContext("webgl");
        console.log("canvas:",canvas,"  gl:",gl)
        
    })
</script>
<div class="pageSection aboutSvelte">
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconAbout"></div>
    <h2 id="about">This is About</h2>
    <p>{$langdataAbout}</p> 
    <canvas id="webglInit" style="display:none"></canvas><!--Dummy object check before attaching webgl canvas-->
    {#if !gl}
        <img alt="3D portrait of Kristian Lothe" src="/headmodel.png"width={`${imgWidth}`} height={`${imgWidth}`}/>
    {:else if gl}
        <canvas aria-label="3D portrait of Kristian Lothe" id="portraitcanvas" width={`${imgWidth}`} height={`${imgWidth}`} ></canvas>
        <Portrait />
    {/if}
        <!-->WebGl fallback -->        
</div>
<style>
    @import '$lib/layout/pages.css';
</style>
