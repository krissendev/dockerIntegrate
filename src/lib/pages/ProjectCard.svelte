<script>
    //tick is used for waiting for DOM updated to prevent raceconditions between html state and scripted element queries
    // import {tick} from 'svelte'
    import {onMount} from 'svelte'
    import {langdataProject, cssDarkmodeModal }               from '$store/store.js';
    import { storeMap, getStoreValue }      from '$lib/routing/storeHandler';

    let projectCards =[];
    let expanded = false;
    export let ontoggleCardExpandContent;


    //Prop from parent SectionProjects.svelte
    export let projectName;

    let intervalLoadStoredata;

    $: projectCardData=undefined;
    onMount(()=>{
        projectCards = document.querySelectorAll(".expandedCard");

        if(projectName){
            getProjectCardData()
        }
    })
    function getProjectCardData(){
        intervalLoadStoredata = setTimeout(async ()=>{
                const projectDataJSON = getStoreValue(langdataProject);
                try{
                    console.log("inside interval getting data...")
                    console.log(projectDataJSON.cards[projectName])
                    projectCardData = projectDataJSON.cards[projectName];
                }
                catch(error){console.log(error)}
            }, 100)
    }    

    $: cardHeader ="";
    $: cardContentMin="";
    $: cardContentMax="";
    $: cardDemoLink="";
    $:{if(projectCardData && projectName){
        cardHeader = projectCardData.header;
        cardContentMin = projectCardData.contentMinimized;
        cardContentMax = projectCardData.contentMaximized;
        cardDemoLink = projectCardData.link;
        console.log("cardHeader")
        console.log(cardContentMax)
    }}
    

    function toggleCardExpandContent(event){
        expanded=!expanded;
        ontoggleCardExpandContent();
        //Delete this later, manual DOM conflicts with Svelte DOM, meaning updates in styling 
        // might not be applied with the following method:

        //awaiting expanded to update in DOM
        // tick().then(() => {
        //     const parentDiv = event.target.parentNode;
        //     const expandedContentDiv = parentDiv.querySelector(".expandedCard");
        //     console.log("toggleCardExpandContent",event)
        //     console.log("toggleCardExpandContent",parentDiv)
        //     console.log("toggleCardExpandContent",expandedContentDiv)
        //     if(expandedContentDiv.style.display ==="block"){
        //         expandedContentDiv.style.display = "none"
        //     }
        //     else{
        //         expandedContentDiv.style.display ="block"
        //     }
        // })
        
    }



</script>
{#if projectName && $langdataProject}
    <div class="projectCardsEntry" class:active={expanded}>
        <!-- <h3>{$langdataProject.cards}</h3>  -->
        <h3>{cardHeader}</h3> 
        <p>{cardContentMin}</p>
        {#if expanded}
        <div class="expandedCard"> 
            <p>{cardContentMax}</p>
        </div>
        {/if}
        <a href={`${cardDemoLink}`} data-sveltekit-reload target="_blank">Live demo<div class="outgoingLink">a</div></a>
        <br>
        <button class="toggleExpand" on:click={toggleCardExpandContent}>More/Less</button>
    </div>
    {:else}
    <div class="projectCardsEntry" class:active={expanded}>
    </div>

{/if}

<style>
    .expandedCard{
        display:block;
    }

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
    width: auto; 
  }
}
.projectCardsEntry.hidden {
    display:none;
}
.outgoingLink{
    display:inline-block;
    /* width:max-content; */
    height:fit-content;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    background-color:cornflowerblue;
    -webkit-mask-image: url('/icons/icon_link.svg');
    mask-image: url('/icons/icon_link.svg');
}
</style>