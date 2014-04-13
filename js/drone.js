
var addDroneToScene = function(geometry, materials) {
	model = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	model.scale.set(1,1,1);
	drone = model;
	scene.add(drone);

	drone.light = new THREE.DirectionalLight(0x88cc00, 2, 100);
	drone.light.position.y = drone.position.y+5;
	scene.add(drone.light);
};

var MoveDrone = function() {
	drone.position = dronePath.getPointAt(t);
	drone.lookAt(dronePath.getPointAt( ( t + 30 / dronePath.getLength() ) % 1 ));
	t = (t>0.9) ? 0 : t + 0.001;
};

var launchDrone = function() {

	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load("models/drone1.js", addDroneToScene);

	//camera.update = function() {
		//camera.position.set(drone.position.x, drone.position.y, drone.position.z);
		//camera.position.x += (mouseX - camera.position.x) * .05;
		//camera.position.y += (-mouseY - camera.position.y) * .05;
		//camera.position.z += mouseZ;
		//camera.lookAt(drone.position);
	//}


	//change camera
	setInterval(MoveDrone, 30); 
};
