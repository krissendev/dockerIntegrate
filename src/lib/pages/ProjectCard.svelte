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
        //this = button class=toggleExpand
        let ariaExpanded = this.getAttribute('aria-expanded')=== 'true';
        this.setAttribute('aria-expanded', String(!ariaExpanded));

        expanded=!expanded;
        ontoggleCardExpandContent();
        if(expanded){this.style.order="4"}
        else{this.style.order="2"}

        
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
    <div class={`${$cssDarkmodeModal} projectCardsEntry`} class:active={expanded}>
        <!-- <h3>{$langdataProject.cards}</h3>  -->
         <!-->Grid layout: 1cardHeader, 2cardContentMin, 3BTNtoggleExpand, 4expandedCard, 5cardDemoLink --->
        <h3 style="order:0;">{cardHeader}</h3> 
        <p style="order:1;">{cardContentMin}</p>
        <button style="order:2;" title="Maximize or minimize content view" aria-expanded="false" class="toggleExpand" on:click={toggleCardExpandContent}>
            Show {#if expanded}Less{:else}More{/if}
        </button>        
        {#if expanded}
        <div style="order:3;" class="expandedCard"> 
            <p>{cardContentMax}</p>
                <div id="carouselArrows">
                    <button class="buttonArrow">←</button>
                    <button class="buttonArrow">→</button>
                </div>
        </div>
        {/if}
        <a style="order:5;" href={`${cardDemoLink}`} data-sveltekit-reload target="_blank">Live demo<div class="outgoingLink">a</div></a>
        <br>
    </div>
    {:else}
    <div class="projectCardsEntry" class:active={expanded}>
    </div>
{/if}

<style>
    @import '$lib/layout/pages.css';
    
    button{
        font-weight: bold;
        background-color: #ff5900;
    }
    button:hover{background-color: #F4953E;}
    button:active{background-color: #F4953E;}
    .expandedCard{
        display:flex;
        flex-flow:column;
    }
    .toggleExpand{
        /* display:flex; */
        /* margin-top: auto; */
        padding:10px;
        align-self:center;
    }

    /* .projectCardsEntry {
        display:flex;
        flex-flow:column;
        width:45%;
        min-width: 100px;
        padding: 5px;
        margin:10px;
        text-align: center;
        border: 2px solid black;
        transition: all 0.3s ease;
    } */
        .projectCardsEntry {
        display:grid;
        grid-template-rows:auto, auto, auto, auto, auto;
        /* flex-flow:column; */
        width:45%;
        min-width: 100px;
        padding: 5px;
        margin:10px;
        text-align: center;
        border: 2px solid black;
        transition: all 0.3s ease;
    }
    .projectCardsEntry a{
        padding:5px;
        align-self:center;
    }
    .carouselArrows button{
        padding:5px;
        margin:5px;
        align-self:center;
    }

    /*Darkmode*/
    .darkModal.projectCardsEntry{background-color: #5F2202;}
    .darkModal.projectCardsEntry a{color:cyan;}

    /*Whitemode*/
    .whiteModal.projectCardsEntry{background-color: #FEE4D7;}
    .whiteModal.projectCardsEntry a{color:blue;}
.projectCardsEntry.active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  padding: 20px;
  margin: 0;  
  gap: 0;  
  box-sizing: border-box;
  border: 1px solid black;  
  z-index: 1;
}
#carouselArrows{
    display:flex;
    align-self:center;
}
.buttonArrow{
    margin:10px;
    width:80px;
    height:40px;
    font-size: large;
}


@media (max-width: 540px) {
  .projectCardsEntry {
    width: auto; 
  }
  .projectCardsEntry.hidden {
      display:none;
  }
  .projectCardsEntry.active {
      position: fixed;
      height: 100vh;
  }

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