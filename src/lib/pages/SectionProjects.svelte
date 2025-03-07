<script>
    import {langdataProject }               from '$store/store.js';
    import Card from './ProjectCard.svelte'

    
    
</script>
<div class="pageSection projectSvelte">
    <br>
    <h3 id="projects" style="paddig:0px; margin:0px; border:0px;">This is Projects</h3>
    <!-- <p>{$langdataProject}</p> -->
    <div class="projectCardsContainer">
        <Card projectName="Project1"/>
        <Card projectName="Project2"/>
        <Card projectName="Project3"/>
        <Card projectName="Project4"/>

        
    </div>
</div>
<style>
    .projectSvelte{
        display:flex;
        flex-direction:column;
        background-color: rgba(0,0,255,0.5);
    }
    .projectCardsContainer{   
        /* display:block;     */
        display:flex;
        justify-content: space-evenly;
        padding:5px;
        background-color: green;
        overflow:auto;
        flex-grow: 1;
    }

    
</style>