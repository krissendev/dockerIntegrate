<script>
        import {langdataAbout, 
            cssDarkmodeModal }              from '$store/store.js';
</script>
<div class="pageSection aboutSvelte">
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconAbout"></div>
    <h3 id="about">This is About</h3>
    <p>{$langdataAbout}</p>
</div>
<style>
    @import '$lib/layout/pages.css';
</style>
