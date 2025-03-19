<script>
    import {langdataProject }               from '$store/store.js';
    import Card from './ProjectCard.svelte'

    function toggleCardRespone() {
		console.log("card toggle response")
	}
    
</script>
<div class="pageSection projectSvelte">
    <br>
    <h3 id="projects" style="paddig:0px; margin:0px; border:0px;">This is Projects</h3>
    <!-- <p>{$langdataProject}</p> -->
    <div class="projectCardsContainer">
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName="2D Physics"/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={false}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={false}/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName={false}/>
        
        <!-- Placeholder, fix for dynamic language-->
        <a href="/en/app">See more</a>

        
    </div>
</div>
<style>
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