<script>
function toggleCardExpandContent(event){
    const parentDiv = event.target.parentNode;
    const expandedContentDiv = parentDiv.querySelector(".expandedCard");
    if(expandedContentDiv.style.display ==="block"){
        expandedContentDiv.style.display = "none"
    }
    else{expandedContentDiv.style.display ="block"}
    
}

//Prop from parent SectionProjects.svelte
export let projectName;

</script>
<div class="projectCardsEntry">
    <h3>{projectName}</h3>
    <p>Some info</p>
    <div class="expandedCard"> 
        More projectinfo
        More projectinfo
    </div>
    <button class="toggleExpand" on:click={toggleCardExpandContent}>More/Less</button>
</div>

<style>
    .projectCardsEntry{
        display:flex;
        width:300px;
        /* display:none; */
        flex-direction:column; 
        margin:10px;
        background-color: aquamarine;
    }
    .expandedCard{
        display:none;
    }
</style>