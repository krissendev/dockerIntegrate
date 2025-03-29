<script>
  import {cookieConsentVisible, 
    cookieModalOverflow, cookieConsent }    from '$store/store.js';
  import {updateStoreBoolToggle, storeMap}  from '$lib/routing/storeHandler.js'
  import {modalToggleBodyScroll}            from '$lib/layout/modal.js'
  import { get }                            from 'svelte/store';
  
  function handleToggle(event){
    //Prevents default input css check, so that check is driven by /store/cookieConsent
    event.preventDefault();
    modalToggleBodyScroll($cookieConsentVisible, modalVisibility);
    updateStoreBoolToggle(storeMap.cookieConsentVisible)

  }

  $: modalVisibility = $cookieConsentVisible

//   function toggleBodyScrollable(toggle){
//     //only toggle when in desktop not on mobile
//     if(window.innerWidth > 540){
//       //if true enable, else disable. Scroll ability overflow on body
//       document.body.style.overflow = toggle ? 'visible':'hidden';
//     }

//     //Bad workaround css hack to fix scroll bleed inside mobile burgermenu, Find better fix later?!!
//     //if modalVisibility is true(actually false as it's switching from true->false) set mobileModal.position=fixed
//     else if(modalVisibility){
//       cookieModalOverflow.set("none")
//     }
//     //else if modalVisibility is false(actually true as it's switching from false->true) set mobileModal.position=absolute
//     else if(!modalVisibility){
//       console.log("cookieModalOverflow")
//       cookieModalOverflow.set("block")
//     }
// }

</script>
<!--Modal for cookie conscent-->

<!-- 
<div class="iconSave icon"></div>
<div class="iconCookie icon"></div>
<div class="iconCookieOFF icon"></div>
<div class="iconTrue icon"></div>
<div class="iconFalse icon"></div> 
-->
<button aria-label="save preferences in cookie"class="iconSave icon"on:click={handleToggle}></button>
{#if $cookieConsent}
  <div class="iconTrue icon"></div>
{:else}
  <div class="iconFalse icon"></div>
{/if}
<!-- <div style="display:inline-block;">
  <div class="switch-container">
    <label class="switch">
      <input type="checkbox" class="sliderChecked" checked={$cookieConsent} on:click={handleToggle}>
      <span class="slider"></span>
    </label>
  </div>
</div> -->
<style>
  .icon{
    display:flex;
    align-self: center;
    height:30px;
    width:30px;
    margin:3px;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
  }
  .iconSave{
    background-color:cornflowerblue;
    -webkit-mask-image: url('/icons/icon_save.svg');
    mask-image: url('/icons/icon_save.svg');
  }
  .iconSave:hover{
    background-color:white;
  }
  .iconCookieOFF{
    background-color:red;
    -webkit-mask-image: url('/icons/icon_stop.svg');
    mask-image: url('/icons/icon_stop.svg');
  }

.iconTrue{
  transform: translate(-60%, -40%) scale(0.5);
  background-color:green;
    -webkit-mask-image: url('/icons/icon_true.svg');
    mask-image: url('/icons/icon_true.svg');
}
.iconFalse{
  transform: translate(-60%, -40%) scale(0.5);
  background-color:red;
    -webkit-mask-image: url('/icons/icon_false.svg');
    mask-image: url('/icons/icon_false.svg');
}

  .switch-container {
      flex-direction: column; /* Stacks flex items vertically */
      display: flex;
      align-items: center; /* Align text and switch vertically */
      margin: 10px;
  }
   /* The switch - the box around the slider */
  .switch {
      vertical-align:middle;
      position: relative;
      display: inline-block;
      width: 60px;
  }

  /* Hide default HTML checkbox */
  .switch input {
  opacity: 0;
  width: 0;
  height: 0;
  }

  /* The slider */
  .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  /* opacity:70%; */
  -webkit-transition: .4s;
  transition: .4s;
  }

  @media screen and (max-width: 540px) {
    .iconTrue, .iconFalse{
      transform: translate(63%, -160%) scale(0.5);
  }
  }
  .slider:before {
  position: absolute;
  content: "";
  height: 80%;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: hsl(0, 0%, 100%);
  /* opacity:70%; */
  -webkit-transition: .4s;
  transition: .4s;
  }

  input:checked + .slider {
  background-color: #2196F3;
  }

  input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  }
</style>