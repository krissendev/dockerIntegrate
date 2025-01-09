<script>  

// I don't need to use onMount in javascript, since its a loaded function this makes it simpler
    import {onMount} from 'svelte';
    import {toggleBurger, initOnMount} from '$lib/layout/nav.js'
    import Darkmode from './Darkmode.svelte'
    let elMainMenu  ;
    let elLinks;
    let elModal;
    

    //nav resize depends on 'browser', which only is available after mount
    onMount(()=>{
        initOnMount(elLinks, elMainMenu, elModal);
    })
    


    function handleToggle(){
        toggleBurger (elLinks, elModal, elMainMenu);
    }
</script>

<div class="topNav"><!--Top Nav-->
    <div class="navLinks" bind:this={elLinks}>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    <Darkmode/>

    <div class="modal" bind:this={elModal}></div><!--Modal-->
    <button aria-hidden="true" class="burger" on:click={handleToggle} bind:this={elMainMenu}>
        <div></div><div></div>
        <div></div>
    </button><!--Burger Menu -->
 
 </div> 

<style>
    @import '$lib/layout/nav.css';
</style>