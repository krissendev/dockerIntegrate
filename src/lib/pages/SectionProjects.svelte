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
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName="Project1"/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName="Project2"/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName="Project3"/>
        <Card ontoggleCardExpandContent={toggleCardRespone} projectName="Project4"/>

        
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