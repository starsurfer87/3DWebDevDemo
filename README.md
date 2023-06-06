# 3D Web Development Demo

This demo will show you how to use the JavaScript library three.js to incorperate animated 3D models into a web page! If you are curious to learn more about three.js, you can find the documentation and a bunch of cool examples [here](https://threejs.org/).

## Getting Set Up
### Importing Three.js
To start with, you need to import the three.js library.

Add the following code to your HTML file inside the head, making sure that it is *before* the script tag that links your HTML file to you JavaScript file:
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
```

Add the following import statements to the top of you JavaScript file
```
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

### Setting Up a Server

In order for the 3D components of your web page to work properly, the page needs to be hosted on a server (local or remote). If you try to just open your HTML file in your web browser, the 3D components will not appear. A few different options for setting up a local server are given below:

#### Option 1: Visual Studio Code and Live Server
If you are already using VS Code or would like to start using it, you can set up a local server using Live Server. First [install VS Code](https://code.visualstudio.com/download) and then [install the Live Server extention](https://www.youtube.com/watch?v=2fhe0LLj3Rw).

#### Option 2: Servez
[Servez](https://greggman.github.io/servez/) is an app that provides a graphical user interface for setting up a local server. This is a great option if you are not using VS Code and are not comfortable with command line.

#### Option 3: Node.js
If you are comfortable using command line, you can also [install Node.js](https://nodejs.org/en) and then run serve in your page's directory using:
```
npx serve
```

## The Template Code
- function definition to copy
- documentation for the function
- any other necessary explaination