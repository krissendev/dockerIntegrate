<script>
    import {langdataProject, 
        cssDarkmodeModal }                  from '$store/store.js';
    import Card from './ProjectCard.svelte'
    function toggleCardRespone() {
		console.log("card toggle response")
	}
    
</script>
<div class="pageSection projectSvelte">
    <!--Oneline 'block-hack' for icon and h3, since inside flex column-->
    <div style="display=block">
        <br>
        <div class={`${$cssDarkmodeModal} pageIcon `} id="iconProject"></div>
        <h3 id="projects" >This is Projects</h3>
    </div>
    <p>{$langdataProject.header}</p>
    <div class="projectCardsContainer">
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={"quadtree"}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={"krissendev"}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={"quadtree"}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={"krissendev"}/>
        
        
        <!-- Placeholder, fix for dynamic language-->
        <!--Disable until more projects make it neccessary!-->
        <!-- <a href="/en/app">See more</a> -->        
    </div>
</div>
<style>
    @import '$lib/layout/pages.css';
    /*Unset from page.css*/
    /* .pageSection{height:unset;} */

    .projectSvelte{
        display:flex;
        flex-direction:column;
    }
    /* .projectCardsContainer{   
        display:flex;
        justify-content: space-evenly;
        padding:5px;
        background-color: green;
        overflow:auto;
        flex-grow: 1;
    } */
    
    .projectCardsContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        height:100%;
        margin: 0;
        padding: 5px;
        position: relative;
        
    }
    @media (max-width: 540px) {
    .projectCardsContainer {
        display: block; 
    }
  }   
</style>