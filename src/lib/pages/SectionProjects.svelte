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
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={false}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={false}/>
        
        <!-- Placeholder, fix for dynamic language-->
        <a href="/en/app">See more</a>

        
    </div>
</div>
<style>
    @import '$lib/layout/pages.css';
    .projectSvelte{
        display:flex;
        flex-direction:column;
        background-color: rgba(0,0,255,0.5);
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
        background-color: pink;
    }
    @media (max-width: 540px) {
    .projectCardsContainer {
        display: block; 
    }
  }   
</style>