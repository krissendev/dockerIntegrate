<script>
    import { onMount } from 'svelte';
    import {cookieConsentVisible } from '$store/store.js';
    $: visibility = $cookieConsentVisible ? 'visible' : 'hidden';
    function handleToggle(){
        cookieConsentVisible.update(value => !value);
    }
</script>

<div class="cookieModalContent" style="visibility: {visibility};">    
    <div class="cookieModal"></div>
    <button aria-label="Close Modal Window" class="exitCookieConsent" on:click={handleToggle}>X</button>
    <div class="cookieModalText">
        <p>We never track cookies, they are only stored on your browser for your convinience to remember the following settings:</p>    
    </div>
</div>



<style>
.cookieModalText{
    position:fixed;
    top:0;
    left:0;
    padding:5px;
}
.cookieModalContent button{
    position:fixed;
    right:0;
    margin: 5px;
}
.cookieModalText p{
    background-color:white;
    
}
.exitCookieConsent{
    width:40px;
    height:40px;
    z-index:3;
}
.cookieModalContent{
    position:absolute;
    z-index: 2;
}    
.cookieModal{
    /* z-index: 3; */
    position:absolute;
    left:0;
    top:0;
    width:100vw;
    height:100vh;
    background-color: blue;
    opacity:90%;
}

</style>