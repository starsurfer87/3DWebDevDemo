# 3D Web Development Demo

This demo will show you how to use the JavaScript library *three.js* to incorperate animated 3D models (in .glb or .gltf format) into a web page! You do not need to have any knowlendge of three.js, everything has been packaged into a single function that you can call in your own JavaScript file. However, if you are curious to learn more about three.js, you can find the documentation and a bunch of cool examples [here](https://threejs.org/). You can find public-domain models in glTF format to use at [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount).

## Downloads and Imports
To start with, you need to import the three.js library and the ```add3D``` function.

Download the [3Dcomponent.js](https://github.com/starsurfer87/3DWebDevDemo/blob/main/3Dcomponent.js) file and add it to the folder with your HTML and JavaScript files.

Add the following code to your HTML file inside the ```<head>``` tag, making sure that it is *before* the script tag that links your HTML file to your JavaScript file:
```
<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
<script type="importmap">
    {
        "imports": {
        "three": "https://unpkg.com/three@v0.153.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@v0.153.0/examples/jsm/"
        }
    }
    </script>
<script type="module" src="3Dcomponent.js"></script>
```

Add the following import statement to the top of your JavaScript file:
```
import {add3D} from './3Dcomponent.js';
```

## Setting Up a Server

In order for the 3D components of your web page to work properly, the page needs to be hosted on a server (local or remote). If you try to just open your HTML file in your web browser, the 3D components will not appear. A few different options for setting up a local server are given below:

### Option 1: Visual Studio Code and Live Server

If you are already using VS Code or would like to start using it, you can set up a local server using Live Server. First [install VS Code](https://code.visualstudio.com/download) and then [install the Live Server extention](https://www.youtube.com/watch?v=2fhe0LLj3Rw).

### Option 2: Servez
[Servez](https://greggman.github.io/servez/) is an app that provides a graphical user interface for setting up a local server. This is a great option if you are not using VS Code and are not comfortable with command line.

### Option 3: Node.js
If you are comfortable using command line, you can also [install Node.js](https://nodejs.org/en) and then run serve in your page's directory using:
```
npx serve
```

## Adding the 3D Model to Your Webpage

Given the set up above, you should now be able to add a 3D model to your webpage by calling the ```add3D``` function from your own JavaScript file, as shown below:


```
add3D(filename, containerID, viewportSize, modelScale);
```
where:

- *filename* (type: string) - path to the file for the model you want to include (must be .glb or .gltf file)

- *containerID* (type: string) - ID for the container that you want your 3D model to be added to

- *viewportSize* (type: float) - size of the viewport as a percent of the width of the screen

- *modelScale* (type: float) - scale of the model as a percent
