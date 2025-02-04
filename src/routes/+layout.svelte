<style>
    @font-face {
      font-family: 'Atkinson Hyperlegible';
      src: url('/fonts/Atkinson-Hyperlegible-Regular-102.eot'); /* IE9 Compat Modes */
      src: url('/fonts/Atkinson-Hyperlegible-Regular-102a.woff2')format('woff2'), /* Super Modern Browsers */
           url('/fonts/Atkinson-Hyperlegible-Regular-102a.woff')format('woff'), /* Pretty Modern Browsers */
           url('/fonts/Atkinson-Hyperlegible-Regular-102.ttf') format('truetype'), /* Safari, Android, iOS */
           url('/fonts/Atkinson-Hyperlegible-Regular-102.svg') format('svg'); /* Legacy iOS */
      font-weight: normal;
      font-style: normal;
    }



:global(body) {
    font-family: 'Atkinson Hyperlegible', sans-serif;

    /* Accessible text spacing CSS */
    /*https://www.w3.org/TR/WCAG21/#text-spacing*/
    line-height: 1.5;    /* Line height is 150% of the font size */
    letter-spacing: 0.12em; /* Letter spacing is 0.12 times the font size */
    word-spacing: 0.16em; /* Word spacing is 0.16 times the font size */

    color:black;
    background-color:white;
}

  :global(p){
      margin-bottom: 2em; /* Spacing after paragraphs is 200% of the font size */
  }
  :global(.pageSection){
    width:100vw;
    height:100vh;
    
  }
  :global(.homeSvelte){background-color: rgba(255,0,0, 0.5);}
  :global(.projectSvelte){background-color: rgba(0,0,255,0.5);}
  :global(.aboutSvelte){background-color: rgba(0,255,0,0.5);}
  :global(.contactSvelte){background-color: rgba(255,255,0,0.5);}
  :global(.whiteModal,.whiteModal a,.whiteModal button){
    color:black;
    background-color: rgba(192, 216, 255, 0.95);
  }
  :global(.darkModal,.darkModal a,.darkModal button){
    color:white;
    background-color: rgba(33, 58, 98, 0.95);
    }
</style>
<slot />