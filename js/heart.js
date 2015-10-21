var camera, scene, renderer;
var cameraControls;
var mesh;
var mouseX = 0, mouseY = 0;

var stats;

init();

function init() {
    camera = new THREE.PerspectiveCamera(45, 
                                         window.innerWidth / window.innerHeight,
                                         0.1, 1000);
    scene = new THREE.Scene();
    camera.position.z = 80;
    camera.lookAt(scene.position);

    var loader = new THREE.STLLoader();

    function onProgress(request) {
        var bar = 250, 
            total = request.total,
            loaded = request.loaded;
        if (total) {
            bar = Math.floor(bar * loaded / total);
        }
        console.info(bar);
        $( "bar" ).style.width = bar + "px";
    }

    loader.load('./obj/heart_n170111.stl', function(geometry) {
        var material = new THREE.MeshPhongMaterial({ 
            color: 0xff5533, specular: 0x111111, shininess: 200 } );
        mesh = new THREE.Mesh(geometry, material);
	    mesh.castShadow = true;
	    mesh.receiveShadow = true;
	    scene.add( mesh );
        
        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // light
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        scene.add(spotLight);

        document.body.appendChild(renderer.domElement);
        //document.addEventListener('mousemove', onDocumentMouseMove, false);
        
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';

        document.body.appendChild(stats.domElement);

         render();
    }, onProgress);
}

function $(id) {
    return document.getElementById(id);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
}

function onWindowResize() {
    camera.aspect = window.innerWidht / window.innerHeight;
    camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function render() {
    requestAnimationFrame(render);

    stats.update();

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;
    
    renderer.render(scene, camera);
}
