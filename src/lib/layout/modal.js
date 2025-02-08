import {cookieModalOverflow} from '$store/store.js';

export function modalToggleBodyScroll(toggle, modalVisibility){
    if(window.innerWidth > 540){
      document.body.style.overflow = toggle ? 'visible':'hidden';
    }
    else if(modalVisibility){
      cookieModalOverflow.set("none")
    }
    else if(!modalVisibility){
      cookieModalOverflow.set("block")
    }
}

export function test(){console.log("hello")}