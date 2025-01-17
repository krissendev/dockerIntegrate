
<div class="cookieModalContent">
    <button aria-label="Close Modal Window">X</button>
    <div class="cookieModalText">
        <p>We never track cookies, they are only stored on your browser for your convinience to remember the following settings:</p>    

    </div>
</div>


<div class="cookieModal"></div>

<style>
.cookieModalText{
    position:fixed;
    top:0;
    left:0;
    padding:5px;
}
.cookieModalContent button{
    position:fixed;
    right:0;
    margin: 5px;
}
.cookieModalText p{
    background-color:white;
    
}
.cookieModalContent{
    position:absolute;
    z-index: 4;
}    
.cookieModal{
    z-index: 3;
    position:absolute;
    left:0;
    top:0;
    width:100vw;
    height:100vh;
    background-color: blue;
    opacity:90%;
}

</style>