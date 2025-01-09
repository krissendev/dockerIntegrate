import { browser } from '$app/environment';

// let elLinks;
// let toggleBurger;
// let elMainMenu;
// let elModal;

let toggled = false;
let docBody;

// Add resize event listener only in the browser, DOM reference, after SvelteOnMount makes "browser" available
export function initOnMount(elLinks, elMainMenu, elModal){
    if(browser) {
        docBody = document.body;
        window.addEventListener('resize', () => {
            if (browser) {
                resetNav(elLinks, elMainMenu, elModal);
            }
        });
    }
}

export function toggleBurger (elLinks, elModal, elMainMenu) {
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
function resetNav(elLinks, elMainMenu, elModal){
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




   



export function testfunc(){
    console.log("hello from nav.js")
}