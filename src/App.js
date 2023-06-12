import { useEffect, useRef } from 'react';
import './App.css';
import * as THREE from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap  from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
function App() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  let GLTF = useRef(null);
  // Create scene
  const scene = new THREE.Scene();
  sceneRef.current = scene;

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-14.81,14.94,8.14);

  // camera
 camera.position.target=(new THREE.Vector3(-14.43,9.789,10.99))
  cameraRef.current = camera;

  // Create renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0)
  rendererRef.current = renderer;


  // Create AmibantLigt
  const ambiantLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity

  scene.add(ambiantLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
directionalLight.position.set(0,0,25);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
directionalLight2.position.set(-0,5,-20)

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
  directionalLight3.position.set(0,5,-5)
  scene.add(directionalLight,directionalLight2);


  // Create controls
  const controls = new OrbitControls(camera, renderer.domElement);
controls.object.position.set(-13.8,11.13,10.4011);
controls.target.set(-6.44,9.87,-15.336)
  controlsRef.current = controls;

//Loading Drill
const loader=new GLTFLoader();
loader.load('Drill/Drill_01_4k.gltf',(gltf)=>{
  gltf.scene.scale.set(100,100,100)
  GLTF.current=gltf;
  // gltf.scene.position.set(15,-12,0)
  scene.add(gltf.scene)
})


    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const setupScrollAnimation=()=>{
      const tl=gsap.timeline();
      //First Section
      tl.to(controls.object.position,{
        x:-3.494,
        y:4.1710,
        z:-18.17,
     scrollTrigger:{
      trigger:".second",
      start:"top bottom",
      end:"top top",
      scrub:true,
      immediateRender: false
     }
      })
      .to(controls.target,{
        x:-11.12,
        y:10.48,
        z:1.24,
     scrollTrigger:{
      trigger:".second",
      start:"top bottom",
      end:"top top",
      scrub:true,
      immediateRender: false
     }
      })
      .to(controls.object.position,{
        x:-15.35,
        y:23.439,
        z:7.212,

     scrollTrigger:{
      trigger:".third",
      start:"top bottom",
      end:"top top",
      scrub:true,
      immediateRender: false
     }
      })
      .to(controls.target,{
        x:-10.233,
        y:12.590,
        z:0.0915,
     scrollTrigger:{
      trigger:".third",
      start:"top bottom",
      end:"top top",
      scrub:true,
      immediateRender: false
     }
      })

    }
const customize=()=>{
  containerRef.current.classList.remove('pointer-events-none')
console.log(containerRef.current)
  const t1=gsap.timeline();
  t1.to(document.getElementById("first"),{opacity:0,duration:0.1})
  .to(document.getElementById("second"),{opacity:0,duration:0.1})
  .to(document.getElementById("third"),{opacity:0,duration:0.1})
  .to(document.getElementById("colors"),{opacity:1,duration:0.1})
  .to(controls.object.position,{
    x:-2.09,
    y:12.28,
    z:21.85,
duration:1
  })
  .to(controls.target,{
    x:-3.5,
    y:8.297,
    z:1.26,
duration:1
  })

}
const Resetcustomize=()=>{
  containerRef.current.classList.add('pointer-events-none')
  const t1=gsap.timeline();
  t1.to(document.getElementById("first"),{opacity:1,duration:0.1})
  .to(document.getElementById("second"),{opacity:1,duration:0.1})
  .to(document.getElementById("third"),{opacity:1,duration:0.1})
  .to(document.getElementById("colors"),{opacity:0,duration:0.1})
  .to(controls.object.position,{
    x:-15.35,
    y:23.439,
    z:7.212,
duration:1
  })
  .to(controls.target,{
    x:-10.233,
    y:12.590,
    z:0.0915,
duration:1
  })

}

// const changeColor=(color)=>{
// console.log(GLTF.current)

// }

  useEffect(() => {
    // Append renderer to container
    let element=document.getElementsByTagName('canvas');
    if(element[0]){
      element[0].parentNode.removeChild(element[0])
    }

     containerRef.current.appendChild(renderer.domElement);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      // console.log(controls,camera)
      renderer.render(scene, camera);
    };
    animate();
    setupScrollAnimation()
    // Event listener for window resize
    window.addEventListener('resize', onWindowResize);

    controls.addEventListener("change", event => {

      // console.log("target", controls.target)
      // console.log("position", controls.object.position);
    })
    // Clean up function
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });

  return(
    <>
      <div className="relative">
    <nav className=' fixed  z-30 w-full flex justify-between px-6 items-center min-h-[100px]'>
      <span className=' text-5xl font-light font-sans '>DRILL</span>
      <button className='bg-black rounded-2xl px-4 py-2 text-white'>BUY NOW</button>
    </nav>
    <section id='first' className='pl-[10%] w-full first h-screen flex flex-col justify-center'>
    <h1 className=' w-80  xl:text-9xl md:text-7xl text-xl font-bold  '>Perfect Drill</h1>
    <p className=' md:w-[450px] w-[250px] md:text-xl my-6'>Variable speed for ultimate fingertip control for all drilling applications. Reverse brush system for full torque and power in forward and reverse, lock-on button for continuous use.</p>
    </section>
{/* 2ND section */}
<section id='second' className='box second w-full  overflow-hidden  relative h-screen items-end justify-center flex flex-col'>


<div className='pr-[8%] z-10 mt-9'>
<h1 className='   xl:text-8xl md:text-3xl text-xl text-left font-bold  '>Comfortable<br></br> to use</h1>
    <p className=' xl:w-[450px] w-[250px] lg:text-xl my-6'>Engonomic reversible hammer drill design with optimal grip positions, light weight and insulated shock proof plastic body,
      easy to change bits
    </p>
</div>

    </section>

    {/* 3RD section */}
<section id='third' className='box1  w-full third overflow-hidden  relative h-screen  justify-center  flex flex-col'>


<div className='pl-[8%] z-10 mt-9'>
<h1 className='   xl:text-8xl md:text-3xl text-xl text-left font-bold  '>Wood <br></br>and metal</h1>
    <p className='  xl:w-[450px] w-[250px] lg:text-xl my-4'>Engonomic reversible hammer drill design with optimal grip positions, light weight and insulated shock proof plastic body,
      easy to change bits
    </p>
    <button onClick={()=>{customize()}} className=' bg-[#FFDB58] btn_customize px-6 py-3 rounded-xl relative z'>Customize</button>
</div>

    </section>


    <footer className= 'min-h-[200px] bg-[#000000d2] flex justify-center items-center w-full'>
<button className='bg-[#d1d1d1a8] px-6 py-3 text-black rounded-xl'>BACK TO TOP</button>
    </footer>

    <div ref={containerRef} id="container " className=' z-20 fixed left-0 w-full overflow-hidden top-0 pointer-events-none'></div>
    </div>;

    <div id='colors' className='fixed opacity-0   flex-col gap-4  left-10 top-[50%] z-40 '>
      {/* <div onClick={()=>changeColor("red")} className='w-9 h-9 cursor-pointer  bg-red-700 rounded-full'>

      </div>
      <div onClick={()=>changeColor("#FFDB58")} className='w-9 h-9 cursor-pointer my-4 bg-yellow-500 rounded-full'>

</div>
<div onClick={()=>changeColor("gray")} className='w-9 h-9 cursor-pointer bg-gray-500 rounded-full'>

</div> */}
<button onClick={()=>Resetcustomize()} className=' mt-3 px-6 py-2 bg-black text-white  rounded-full'>
close
</button>
    </div>
    </>
  )

}

export default App;