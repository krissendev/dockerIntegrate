import { browser } from '$app/environment';
import { isMobile, cookieModalOverflow, cookieConsentVisible } from '$store/store';
// let elLinks;
// let toggleBurger;
// let elMobileMenu;
// let elMobileModal;

let toggled = false;
let docBody;

// Add resize event listener only in the browser, DOM reference, after SvelteOnMount makes "browser" available

export function initOnMount(elLinks, elNavMenu, elDivider, elSettings,elMobileMenu, elMobileModal){
    if(browser) {
        docBody = document.body;
        window.addEventListener('resize', () => {
            if (browser) {
                resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal);
            }
        });
    }
}

export function toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu) {
    if(toggled){

        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elDivider.style.display  = "none"; 
        elSettings.style.display  = "none";

        elMobileMenu.classList.remove('active')
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible"
    }
    else if(!toggled){
        
        elLinks.style.display  = "block";
        
        elNavMenu.style.display  = "flex"; 
        elDivider.style.display  = "flex"; 
        elSettings.style.display  = "flex";

        elMobileMenu.classList.toggle('active')
        // elLinks.style.height = "100vh";
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "hidden";
    }
    toggled=!toggled
}

let counter = 0;
function resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal){
    counter++;
    // console.log(`resize ${counter}`)
    toggled = false;
    if(window.innerWidth> 540){
        isMobile.set(false)
        
        cookieModalOverflow.set('none')
        cookieConsentVisible.set(false)
        document.body.style.overflow = 'visible'
        
        elMobileMenu.classList.remove('active')
        elLinks.style.display  = "flex";
        // elLinks.style.height = "10vh"
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible"

        
    }
    else if(window.innerWidth < 541){
        isMobile.set(true)

        cookieModalOverflow.set('none')
        cookieConsentVisible.set(false)
        document.body.style.overflow = 'visible'

        elMobileMenu.classList.remove('active')
        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elDivider.style.display  = "none"; 
        elSettings.style.display  = "none";

        elMobileMenu.classList.remove('active')
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible"
        
        
    }     
}




   


