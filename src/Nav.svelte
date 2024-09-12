<script>

    let elLinks;
    let elMainMenu;
    let elModal;
    let docBody = document.body;
    let toggled = false;
    window.addEventListener('resize', resetNav);

    function toggleBurger() {
        if(toggled){
            console.log("toggled")

            elMainMenu.classList.remove('active')
            elLinks.style.display  = "none";
            elModal.style.display  = "none";
            docBody.style.overflow = "visible"
        }
        else if(!toggled){
            console.log("not toggled")
            
            elMainMenu.classList.toggle('active')
            elLinks.style.display  = "flex";
            elLinks.style.height = "100vh";
            elModal.style.display  = "block";
            docBody.style.overflow = "hidden";
        }
        toggled=!toggled
    }

    let counter = 0;
    function resetNav(){
    counter++;
    console.log(`resize ${counter}`)
    toggled = false;
    if(window.innerWidth> 540){
        elMainMenu.classList.remove('active')
        elLinks.style.display  = "block";
        elLinks.style.height = "10vh"
        elModal.style.display  = "none";
        docBody.style.overflow = "visible"

        
    }
    else if(window.innerWidth < 541){
        elMainMenu.classList.remove('active')
        console.log("return")
        if(elLinks.style.display=="block"){
            console.log("contains")
            elLinks.style.display= '';
            elLinks.style.display  = "hidden";
        }
        
    }     
}
</script>

<div class="topNav"><!--Top Nav-->
    <div class="navLinks" bind:this={elLinks}>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    
    <div class="modal" bind:this={elModal}></div><!--Modal-->
    <button class="burger" on:click={toggleBurger} bind:this={elMainMenu}>
        <div></div><div></div>
        <div></div>
    </button><!--Burger Menu-->
 
 </div> 


<style>

body {
    background-color: white;
    margin:0px;
    padding:0px;
    overflow: visible;
    
}
.navLinks, .logo{z-index: 2;}  

.topNav {
    top:0px;
    background-color: rgba(255, 255, 255, 0.90);
    position:sticky; 
    z-index: 1;
    display: flex;
    min-height:10vh;
}

.burger {
    z-index: 2;
    display: none;
    position:absolute;
    right: 0;
    top: 0;
    height: 50px;
    width:50px;
    /* background:url(../burger_white.png) no-repeat center; */
    background-color: red;
    background-size: 30px 30px;

}  
.burger div{
    width:24px;
    height:5px;
    margin:5px;
    background-color: black; 
}


.modal{
    z-index: 1;
    display:none;
    position: absolute;
    width:100vh;
    height:100vh;
    background-color:#ff0000bd
}

@media screen and (max-width: 540px) {
    .topNav{
        height:10vh;
    }     
    .burger{
        display:block;        
    }

    :global(.burger.active) div:nth-child(1){
        animation: transitionBurgerTopDown 0.05s linear 1 normal forwards;
    }
    :global(.burger.active) div:nth-child(2){
        
        display:none;    }
        :global(.burger.active) div:nth-child(3){
        animation: transitionBurgerBottomUp 0.05s linear 1 normal forwards;
    }
    
    .navLinks{
        display:none;
        width:100vh;
        flex-direction: column; 
        justify-content: center;
        align-items:center;   
        padding:10%; 
    }
    .navLinks a{
        padding:10%;
    }
    .modal{
        display:none;
    }
}

.content{
    z-index: 0;
}
 

/*Burger transtition animation*/
@keyframes transitionBurgerTopDown{
    from{
        width:24px;
        transform: rotate(0deg)translate(0px,0px); 
        transform-origin: top right;   
    }
    to{
        width:34px;
        transform: rotate(-45deg)translate(-4px,-12px);
        transform-origin: top right;    
    }
}
@keyframes transitionBurgerBottomUp{
    from{
        width:24px;
        transform: rotate(0deg)translate(0px,0px); 
        transform-origin: bottom right;   
    }
    to{
        width:34px;
        transform: rotate(45deg)translate(-4px,12px);
        transform-origin: bottom right;    
    }
}
 </style>