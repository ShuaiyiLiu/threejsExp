var camera, scene, renderer;
var mesh;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(45, 
                                         window.innerWidth / window.innerHeight,
                                         0.1, 1000);
    scene = new THREE.Scene();
    camera.position.z = 80;
    camera.lookAt(scene.position);

    var loader = new THREE.STLLoader();

    loader.load('./obj/heart_n170111.stl', function(geometry) {
        var material = new THREE.MeshPhongMaterial({ 
            color: 0xff5533, specular: 0x111111, shininess: 200 } );
        mesh = new THREE.Mesh(geometry, material);
	    mesh.castShadow = true;
	    mesh.receiveShadow = true;
	    scene.add( mesh );
        
        // light
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        scene.add(spotLight);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
        
        window.addEventListener('resize', onWindowResize, false);
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidht / window.innerHeight;
    camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame(animate);
    
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.005;

    renderer.render(scene, camera);
}
