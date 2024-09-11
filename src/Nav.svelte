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
    <a>Logo</a>
    <div class="navLinks" bind:this={elLinks}>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
    
    <div class="modal" bind:this={elModal}></div><!--Modal-->
    <button class="burger" on:click={toggleBurger} bind:this={elMainMenu}></button><!--Burger Menu-->
 
 </div> 
 <div class="content">
 
   <!-- <p>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu. Viverra justo nec ultrices dui sapien. Elit ut aliquam purus sit amet luctus venenatis. At erat pellentesque adipiscing commodo elit at imperdiet. Diam vulputate ut pharetra sit. Fermentum odio eu feugiat pretium nibh ipsum. Nam libero justo laoreet sit amet. Quis enim lobortis scelerisque fermentum dui faucibus in. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Tellus elementum sagittis vitae et leo duis. Dui id ornare arcu odio ut sem nulla pharetra diam.
   
   Mattis pellentesque id nibh tortor id aliquet lectus proin. Pretium nibh ipsum consequat nisl. Sed egestas egestas fringilla phasellus. In massa tempor nec feugiat nisl pretium fusce. Facilisis mauris sit amet massa vitae tortor. Egestas sed tempus urna et pharetra. Lobortis mattis aliquam faucibus purus in massa tempor nec. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Consectetur purus ut faucibus pulvinar elementum integer. Quis commodo odio aenean sed. Non diam phasellus vestibulum lorem sed. Sed libero enim sed faucibus. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Maecenas accumsan lacus vel facilisis. Pellentesque id nibh tortor id aliquet. Sit amet justo donec enim diam vulputate ut pharetra.
   
   Donec pretium vulputate sapien nec sagittis aliquam. Lacus vel facilisis volutpat est velit egestas. Ultricies leo integer malesuada nunc. Euismod nisi porta lorem mollis aliquam ut porttitor. Porta lorem mollis aliquam ut porttitor leo a diam. Augue eget arcu dictum varius duis at. Id venenatis a condimentum vitae sapien pellentesque habitant morbi. Vulputate dignissim suspendisse in est. Ornare massa eget egestas purus. Interdum varius sit amet mattis vulputate enim nulla aliquet. Ac ut consequat semper viverra nam.
   
   Diam vulputate ut pharetra sit. Neque convallis a cras semper. Nec feugiat in fermentum posuere urna. Faucibus ornare suspendisse sed nisi lacus sed. Enim tortor at auctor urna. Risus pretium quam vulputate dignissim suspendisse in est ante. Eu nisl nunc mi ipsum faucibus. Elit ut aliquam purus sit amet. Viverra mauris in aliquam sem. Sodales ut etiam sit amet nisl purus in mollis. Scelerisque purus semper eget duis at tellus at urna. Mus mauris vitae ultricies leo integer. Scelerisque varius morbi enim nunc faucibus a. Erat velit scelerisque in dictum non. Fermentum dui faucibus in ornare. Nunc sed blandit libero volutpat. Aenean euismod elementum nisi quis eleifend quam. Etiam sit amet nisl purus in mollis nunc sed.
   
   Quis vel eros donec ac odio tempor. Ullamcorper sit amet risus nullam eget. Hendrerit gravida rutrum quisque non tellus orci ac auctor. Vel pretium lectus quam id leo in vitae. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Elit pellentesque habitant morbi tristique senectus et netus. Consequat semper viverra nam libero justo laoreet sit. Sed euismod nisi porta lorem mollis aliquam ut. Scelerisque varius morbi enim nunc faucibus. Velit sed ullamcorper morbi tincidunt. Pellentesque sit amet porttitor eget dolor. Ultricies mi eget mauris pharetra et ultrices neque.
   </p> -->
 
 </div>

 <style>
    /*.class  #id*/
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
    background:url(../burger_white.png) no-repeat center;
    background-color: red;
    background-size: 30px 30px;

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
    /* {display: none;} */
    .topNav{
        height:10vh;
    } 
    
    .burger{
        display:inline-block;
        align-items: center;
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
 
 </style>