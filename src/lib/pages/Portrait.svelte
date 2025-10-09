<script>
    // https://threejs.org/manual/#en/creating-a-scene
    // https://threejs.org/docs/#examples/en/loaders/GLTFLoader
    import {onMount} from 'svelte'
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    let timestamp=0;
    let mesh;
    let meshY=0;
    let mousePos={x:undefined, y:undefined}
    let docMounted=false;
    let canvas=undefined;
    let canvasborder = undefined;
    let renderer = undefined;
    onMount(()=>{


        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        canvas = document.querySelector("#portraitcanvas");
        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        // renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        renderer.setSize(window.innerWidth/2, window.innerWidth/2);
        // renderer.setClearColor( 0xffffff, 1 );
        renderer.setClearColor( 0xF79A6B, 1 );
        
        // document.body.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        
        const loader = new GLTFLoader();
        
        // loader.load( 'headmodel.glb', function ( gltf ) {

        //     scene.add( gltf.scene );
        //     mesh = gltf.scene; 
        // }, undefined, function ( error ) {console.error( error );} );
        
        (async () => {
            try{
                const gltf = await new Promise((resolve, reject) => {
                    loader.load('headmodel.glb',resolve, undefined, reject);
                });
                mesh=gltf.scene;
                scene.add(mesh);
                
                camera.position.z = 2.5;
                camera.position.y = 0.9;
                const light = new THREE.AmbientLight( 0xffffff );
                scene.add( light );
                
            
            renderer.setAnimationLoop(() => {
                animate();
            });                    
            docMounted=true;
            let boundingCanvas = canvas.getBoundingClientRect();
            canvasborder = {
                left : Math.trunc(boundingCanvas.left),
                top : Math.trunc(boundingCanvas.top),
                right : Math.trunc(boundingCanvas.right),
                bottom : Math.trunc(boundingCanvas.bottom),
            }
            console.log(canvas)
            }
            catch(err){console.error("Loading mesh data failed", err)}
        })();

        function animate(){
            if (mesh){
                meshY+= 0.01;
                mesh.rotation.y=meshY; 
                renderer.render(scene, camera);
            }                     
        }

        document.addEventListener("mousemove", (e)=>{
            mousePos.x=e.clientX;
            mousePos.y=e.clientY;
        })

        //Mobile touch ;rotate 3D portrait.
        canvas.addEventListener("pointerdown",(e)=>{
            pauseRotation()
        }); 
       //Mouse cursor hover; rotate 3D portrait.
        canvas.addEventListener("mousemove",(e)=>{
            pauseRotation()
        }); 

        function pauseRotation(){
            meshY = 1.6;
            renderer.setAnimationLoop(null)
            setTimeout(()=>{
                renderer.setAnimationLoop(()=>{animate();})
            },2000)            
        }

 

    })
</script>
<!-- <h3>Coords {#if mesh}{mesh.rotation.y}{:else}loading...{/if}</h3> -->