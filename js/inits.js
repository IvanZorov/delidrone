
var initRenderer = function() {

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0x303030);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.sortObjects = false;
	container = document.getElementById('ThreeJS');
	container.appendChild(renderer.domElement);
};

var initLight = function() {

	scene.add(new THREE.AmbientLight(0x808080));
};
