import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function add3D(filename, containerID, viewportSize, modelScale) {

    let camera, scene, renderer, controls;

    const mixers = [];

    const clock = new THREE.Clock();

    const ASPECT_RATIO = 4 / 3;

    init();
    animate();

    function init() {
        const container = document.getElementById(containerID);

        camera = new THREE.PerspectiveCamera(30, ASPECT_RATIO, 1, 5000);
        camera.position.set(0, 150, 500);

        scene = new THREE.Scene();
        scene.background = new THREE.Color().setHSL(0, 0, 0.9);
        scene.fog = new THREE.Fog(scene.background, 1, 5000);

        // HEMISPHERE LIGHT

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 250, 0);
        scene.add(hemiLight);

        // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        // scene.add(hemiLightHelper);

        // DIRECTIONAL LIGHT 

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0, 0, 1);
        dirLight.position.set(- 1, 1.75, 1);
        dirLight.position.multiplyScalar(150);
        scene.add(dirLight);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 500;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;

        // TODO: get shadows working

        // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
        // scene.add(dirLightHelper);

        // GROUND

        const groundGeo = new THREE.PlaneGeometry(10000, 10000);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        groundMat.color.setHSL(0, 0, 0.3);

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = - Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // MODEL

        const loader = new GLTFLoader();

        loader.load(filename, function (gltf) {

            const mesh = gltf.scene;

            mesh.scale.set(modelScale, modelScale, modelScale);

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add(mesh);

            const mixer = new THREE.AnimationMixer(mesh);
            mixer.clipAction(gltf.animations[0]).play();
            mixers.push(mixer);

        });

        // RENDERER

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        updateRendererSize();
        container.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;

        // INTERACTIONS

        window.addEventListener('resize', updateRendererSize);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 100, 0);
        controls.update();
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;
        // TODO: add in max/min values for zoom 

    }

    function updateRendererSize() {
        renderer.setSize(window.innerWidth * viewportSize, window.innerWidth * viewportSize / ASPECT_RATIO);
    }

    function animate() {

        requestAnimationFrame(animate);

        render();

    }

    function render() {

        const delta = clock.getDelta();

        for (let i = 0; i < mixers.length; i++) {

            mixers[i].update(delta);

        }

        renderer.render(scene, camera);

    }
}

export { add3D };
