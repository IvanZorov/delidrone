
var addWorldToScene = function () {

	var floor = new THREE.Mesh(new THREE.PlaneGeometry(100000, 100000, 1, 1), new	THREE.MeshPhongMaterial({ color:0x050505, side: THREE.BackSide }));
	floor.rotation.x = Math.PI / 2;

	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
	var buildingMesh= new THREE.Mesh( geometry );

	var cityGeometry= new THREE.Geometry();
	for( var i = 0; i < 200; i ++ ) {

		buildingMesh.position.x = Math.floor( Math.random() * 100 - 100 ) * 70;
		buildingMesh.position.z = Math.floor( Math.random() * 100 - 100 ) * 70;
		buildingMesh.rotation.y = Math.random()*Math.PI*2;
		buildingMesh.scale.x = Math.random() * 50 + 50;
		buildingMesh.scale.y = Math.random() * buildingMesh.scale.x * 25 + 50;
		buildingMesh.scale.z = Math.random() * 50 + 50;
		THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
	}

	var material  = new THREE.MeshBasicMaterial({color:0x0020ff});
	var cityMesh = new THREE.Mesh(cityGeometry, material );
	world = cityMesh;
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
