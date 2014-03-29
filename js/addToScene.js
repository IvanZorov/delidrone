
var addDroneToScene = function (geometry, materials) {

	model = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	model.scale.set(1,1,1);
	drone = model;
	scene.add(drone);

	drone.light = new THREE.DirectionalLight(0x88cc00, 2, 100);
	drone.light.position.y = drone.position.y+5;
	scene.add(drone.light);
};

var addWorldToScene = function () {

	var floor = new THREE.Mesh(new THREE.PlaneGeometry(100000, 100000, 1, 1), new	THREE.MeshPhongMaterial({ color:0x050505, side: THREE.BackSide }));
	floor.rotation.x = Math.PI / 2;

	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	var buildingMesh= new THREE.Mesh( geometry );

	var cityGeometry= new THREE.Geometry();
	for( var i = 0; i < 2000; i ++ ) {

		buildingMesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 40;
		buildingMesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 40;
		buildingMesh.rotation.y = Math.random()*Math.PI*2;
		buildingMesh.scale.x = Math.random() * 100 + 10;
		buildingMesh.scale.y = (Math.random() * buildingMesh.scale.x) * 30 + 10;
		buildingMesh.scale.z = Math.random() * 100 + 10;
		THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
	}

	var material  = new THREE.MeshLambertMaterial({color:0x202020});
	var cityMesh = new THREE.Mesh(cityGeometry, material );

	scene.add(cityMesh);
	scene.add(floor);
};

var addCurveToScene = function() {

	spline = new THREE.SplineCurve3([
			   new THREE.Vector3( 0, 0, 0 ),
			   new THREE.Vector3( 0, 200, 0 ),
			   new THREE.Vector3( 150, 150, 0 ),
			   new THREE.Vector3( 150, 50, 50 ),
			   new THREE.Vector3( 250, 100, 0 ),
			   new THREE.Vector3( -250, 100, -50 ),
			   new THREE.Vector3( 200, 200, -200 ),

	]);

	var material = new THREE.LineBasicMaterial({
		color: 0x0ff000,
	});

	var geometry = new THREE.Geometry();
	var splinePoints = spline.getPoints(50);

	for (var i = 0; i < splinePoints.length; i++) {
		geometry.vertices.push(splinePoints[i]);
	};

	var line = new THREE.Line(geometry, material);
	
	dronePath = spline;
	scene.add(line);

};
