import {cookieModalOverflow} from '$store/store.js';
import {updateStorePrimitive, storeMap}from '$lib/routing/storeHandler.js'

export function modalToggleBodyScroll(toggle, modalVisibility){
    if(window.innerWidth > 540){
      document.body.style.overflow = toggle ? 'visible':'hidden';
    }
    else if(modalVisibility){
      updateStorePrimitive(storeMap.cookieModalOverflow, "none")
    }
    else if(!modalVisibility){
      updateStorePrimitive(storeMap.cookieModalOverflow, "block")
    }
}
