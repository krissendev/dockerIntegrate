<script>
        import {langdataAbout, 
            cssDarkmodeModal }              from '$store/store.js';
        import Portrait                  from './Portrait.svelte'
</script>
<div class="pageSection aboutSvelte">
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconAbout"></div>
    <h3 id="about">This is About</h3>
    <p>{$langdataAbout}</p>
    <canvas id="portraitcanvas" width="150" height="150" ></canvas>
    <Portrait />
</div>
<style>
    @import '$lib/layout/pages.css';
</style>
