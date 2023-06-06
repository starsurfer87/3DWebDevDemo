import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, controls;

const mixers = [];

const clock = new THREE.Clock();

init();
animate();

function init() {
    const container = document.getElementById( '3D container' );

    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 0, 3, 20);

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0,0,0.9);
    scene.fog = new THREE.Fog( scene.background, 1, 5000 );

    // HEMISPHERE LIGHT

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    scene.add( hemiLightHelper );

    // DIRECTIONAL LIGHT 

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0, 0, 1);
    dirLight.position.set( - 1, 1.75, 1 );
    dirLight.position.multiplyScalar( 30 );
    scene.add( dirLight );

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
    
    // TODO: edit settings to suit final scene

    const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
    scene.add( dirLightHelper );

    // GROUND

    const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
    const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    groundMat.color.setHSL( 0, 0, 0.75 );

    const ground = new THREE.Mesh( groundGeo, groundMat );
    ground.position.y = 0.5;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add( ground );

    // MODEL

    const loader = new GLTFLoader();

    loader.load( 'models/placeholder_model.glb', function ( gltf ) {

        const mesh = gltf.scene.children[ 0 ];

        const s = 1;
        mesh.scale.set( s, s, s );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

        const mixer = new THREE.AnimationMixer( mesh );
        mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
        mixers.push( mixer );

    } );

    // RENDERER

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;

    // INTERACTIONS

    window.addEventListener( 'resize', onWindowResize );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI/2 - 0.1;
    // TODO: add in max/min values for zoom 
    // (may also need to edit max values for rotation)

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const delta = clock.getDelta();

    for ( let i = 0; i < mixers.length; i ++ ) {

    mixers[ i ].update( delta );

    }

    renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}