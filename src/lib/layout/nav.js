import { browser } from '$app/environment';
import { isMobile, cookieModalOverflow, cookieConsentVisible } from '$store/store';
// let elLinks;
// let toggleBurger;
// let elMobileMenu;
// let elModal;

let toggled = false;
let docBody;

// Add resize event listener only in the browser, DOM reference, after SvelteOnMount makes "browser" available
export function initOnMount(elLinks, elNavMenu, elDivider, elSettings,elMobileMenu, elModal){
    if(browser) {
        docBody = document.body;
        window.addEventListener('resize', () => {
            if (browser) {
                resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elModal);
            }
        });
    }
}

export function toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elModal, elMobileMenu) {
    if(toggled){
        console.log("toggled")

        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elDivider.style.display  = "none"; 
        elSettings.style.display  = "none";

        elMobileMenu.classList.remove('active')
        elModal.style.display  = "none";
        docBody.style.overflow = "visible"
    }
    else if(!toggled){
        console.log("not toggled")
        
        elLinks.style.display  = "block";
        
        elNavMenu.style.display  = "flex"; 
        elDivider.style.display  = "flex"; 
        elSettings.style.display  = "flex";

        elMobileMenu.classList.toggle('active')
        // elLinks.style.height = "100vh";
        elModal.style.display  = "block";
        docBody.style.overflow = "hidden";
    }
    toggled=!toggled
}

let counter = 0;
function resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elModal){
    counter++;
    console.log(`resize ${counter}`)
    toggled = false;
    if(window.innerWidth> 540){
        isMobile.set(false)
        
        cookieModalOverflow.set('none')
        cookieConsentVisible.set(false)
        document.body.style.overflow = 'visible'
        
        elMobileMenu.classList.remove('active')
        elLinks.style.display  = "flex";
        // elLinks.style.height = "10vh"
        elModal.style.display  = "none";
        docBody.style.overflow = "visible"

        
    }
    else if(window.innerWidth < 541){
        isMobile.set(true)

        cookieModalOverflow.set('none')
        cookieConsentVisible.set(false)
        document.body.style.overflow = 'visible'

        elMobileMenu.classList.remove('active')
        console.log("return")
        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elDivider.style.display  = "none"; 
        elSettings.style.display  = "none";

        elMobileMenu.classList.remove('active')
        elModal.style.display  = "none";
        docBody.style.overflow = "visible"
        
        
    }     
}




   



export function testfunc(){
    console.log("hello from nav.js")
}