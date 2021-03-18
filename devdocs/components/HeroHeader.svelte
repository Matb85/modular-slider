<header class="w-full h-3/4  relative">
  <hgroup class="relative top-1/3">
    <h1 class="text-5xl mx-auto w-3/4 max-w-4xl text-center">Welcome to the Modular Slider's demo page</h1>
    <h2 class="text-4xl mx-auto  mt-4 w-3/4 max-w-4xl text-center">Check out the examples below!</h2>
  </hgroup>
  <div class="wh-full absolute top-0" style="z-index: -1; filter: url('#aurora')"></div>
</header>

  
<svg xmlns="http://www.w3.org/2000/svg" class="fixed top-full w-0 h-0">
  <filter id="aurora">
    <feTurbulence baseFrequency="0.0007" seed="14" type="fractalNoise" numOctaves="2"/>
     <feColorMatrix type="saturate" values="10" in="blur" result="colormatrix"/>
    <feGaussianBlur stdDeviation="30" in="turbulence" edgeMode="none" result="blur"/>
    <feComponentTransfer>
    <feFuncA type="linear" slope="0.6"/>
  </feComponentTransfer>
  </filter>
</svg>