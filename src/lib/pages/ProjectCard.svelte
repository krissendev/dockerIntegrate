<script>
    import {onMount} from 'svelte'
    let projectCards =[];
    let expanded = false;
    export let ontoggleCardExpandContent;

    onMount(()=>{
        projectCards = document.querySelectorAll(".expandedCard");

    })


    function toggleCardExpandContent(event){
        expanded=!expanded;
        ontoggleCardExpandContent();
        //Delete this later, manual DOM conflicts with Svelte DOM, meaning updates in styling 
        // might not be applied with the following method:

        // const parentDiv = event.target.parentNode;
        // const expandedContentDiv = parentDiv.querySelector(".expandedCard");
        // if(expandedContentDiv.style.display ==="block"){
        //     expandedContentDiv.style.display = "none"
        //     parentDiv.classList.remove('active');
        // }
        // else{
        //     parentDiv.classList.add('active');
        //     expandedContentDiv.style.display ="block"
        // }
        
    }

    //Prop from parent SectionProjects.svelte
    export let projectName;

</script>
{#if projectName}
    <div class="projectCardsEntry" class:active={expanded}>
        <h3>{projectName}</h3>
        <p>Some info</p>
        {#if expanded}
        <div class="expandedCard"> 
            More projectinfo
            More projectinfo
        </div>
        {/if}
        <button class="toggleExpand" on:click={toggleCardExpandContent}>More/Less</button>
    </div>
    {:else}
    <div class="projectCardsEntry" class:active={expanded}>
    </div>

{/if}

<style>
    /* .projectCardsEntry{
        display:flex;
        width:300px;
        flex-direction:column; 
        margin: 0;
        padding: 0;
        gap: var(--gap);
        position: relative;
        background-color: aquamarine;
    } */
    .expandedCard{
        display:none;
    }
    /* .projectCardsEntry.active{
        display:block;
        position:absolute;
        height:80%;
        margin:0;
        padding:0;
        border:0;
        background-color: blueviolet;
    } */

    .projectCardsEntry {
        /* flex: 1; */
        width:45%;
        min-width: 100px;
        background-color: aquamarine;
        padding: 10px;
        text-align: center;
        border: 1px solid black;
        transition: all 0.3s ease;
    }


.projectCardsEntry.active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: purple;
  padding: 20px;
  margin: 0;  
  gap: 0;  
  box-sizing: border-box;
  border: 1px solid red;  
}


@media (max-width: 540px) {
  .projectCardsEntry {
    width: 100%; 
  }
}
.projectCardsEntry.hidden {
    display:none;
}
</style>