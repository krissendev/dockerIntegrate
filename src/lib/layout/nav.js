import { browser }                          from '$app/environment';
import { isMobile, cookieModalOverflow, 
    cookieConsentVisible, cookieConsent }   from '$store/store';
import {updateStorePrimitive, storeMap, 
        updateStoreBoolToggle}               from '$lib/routing/storeHandler.js'
// let elLinks;
// let toggleBurger;
// let elMobileMenu;
// let elMobileModal;

let toggled = false;
let docBody;
let docHtml;

// Add resize event listener only in the browser, DOM reference, after SvelteOnMount makes "browser" available

export function initOnMount(elLinks, elNavMenu, elDivider, elSettings,elMobileMenu, elMobileModal,topNav){
    if(browser) {
        docBody = document.body;
        docHtml = document.documentElement;
        window.addEventListener('resize', () => {
            if (browser) {
                resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal, topNav);
            }
        });
    }
}

export function toggleBurger (elLinks,elNavMenu, elDivider, elSettings, elMobileModal, elMobileMenu, burgerStateTrue, topNav) {
    toggled = burgerStateTrue?burgerStateTrue:toggled;
    if(toggled){
        toggled=false;
        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elMobileMenu.classList.remove('active')
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible"
        topNav.style.position = "fixed";

        /* re-enable scrolling on body & html after burger modal turned off*/
        docBody.classList.remove("disabledScroll")

        //close cookie modal inside burger menu
        updateStoreBoolToggle(storeMap.cookieConsent, false)
    }
    else if(!toggled){
        toggled=true;
        elLinks.style.display  = "block";
        
        elNavMenu.style.display  = "flex"; 
        // elDivider.style.display  = "flex"; 
        // elSettings.style.display  = "flex";

        elMobileMenu.classList.toggle('active')
        // elLinks.style.height = "100vh";
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "hidden";

        /* disable scrolling on body & html, used for webkit mobil scroll exits from modal*/
        docBody.classList.add("disabledScroll")
        topNav.style.position = "sticky";
    }
}

let counter = 0;
function resetNav(elLinks,elNavMenu, elDivider, elSettings, elMobileMenu, elMobileModal, topNav){
    counter++;
    // console.log(`resize ${counter}`)
    toggled = false;
    if(window.innerWidth> 540){
        updateStorePrimitive(storeMap.isMobile, false)        
        updateStorePrimitive(storeMap.cookieModalOverflow, "none")        
        updateStorePrimitive(storeMap.cookieConsentVisible, false)        
        elNavMenu.style.display='flex';
        elMobileMenu.classList.remove('active');
        elLinks.style.display  = "flex";
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible";
        topNav.style.position = "sticky";
        docHtml.style.scroll_padding_top = "80px";

        
    }
    else if(window.innerWidth < 541){
        updateStorePrimitive(storeMap.isMobile, true)        
        updateStorePrimitive(storeMap.cookieModalOverflow, "none")        
        updateStorePrimitive(storeMap.cookieConsentVisible, false)    
        elMobileMenu.classList.remove('active');
        elLinks.style.display  = "none";
        elNavMenu.style.display  = "none"; 
        elMobileMenu.classList.remove('active');
        elMobileModal.style.display  = "none";
        docBody.style.overflow = "visible";
        topNav.style.position = "fixed";
        docHtml.style.scroll_padding_top = "0px";
        
        
    }     
}




   


