var initCamera = function() {

	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000000);
	camera.update = function() {
		controls.update(clock.getDelta());
	};
	camera.position.set(0, 800, 0);
	camera.lookAt(world.position);
	scene.add(camera);
};
