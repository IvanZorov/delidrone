
var onWindowResize = function() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.handleResize();
};

var onDocumentMouseMove = function(event) {
	mouseX = (event.clientX - windowHalfX) * 2;
	mouseY = (event.clientY - windowHalfY) * 2;
};

var flipCamera = function() {
	mouseZ = -mouseZ;
};

var selectBuilding = function(event_info) {
	mouse.x = (event_info.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event_info.clientY / window.innerHeight) * 2 + 1;	
	mouse_vector.set(mouse.x, mouse.y, mouse.z);	
	projector.unprojectVector(mouse_vector, camera);
	
	var direction = mouse_vector.sub(camera.position).normalize();	
	ray.set(camera.position, direction);	
	intersects = ray.intersectObject(world);	
	if(intersects.length) {
		alert("A building has been selected.\nLaunching the drone.");
		launchDrone();
		//remove this event handler
	}
};