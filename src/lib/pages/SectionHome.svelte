<script>
    import {langdataHome, cssDarkmodeModal }from '$store/store.js';

</script>
<div class="pageSection homeSvelte">
    <br>
    <div class={`${$cssDarkmodeModal} pageIcon `} id="iconHome"></div>
    <h3 id="home">This is home/hero section</h3>
    <h4>Build Trust</h4>
    <button>Call to Action</button>
    <p>{$langdataHome}</p>
</div>

<style>
    @import '$lib/layout/pages.css';
</style>