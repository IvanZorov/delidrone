
var addCityToScene = function () {

	var geometry = new THREE.CubeGeometry(1, 1, 1);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
	var buildingMesh = new THREE.Mesh(geometry);
	var cityGeometry = new THREE.Geometry();

	for(var i = 0; i < 250; i ++) {

		buildingMesh.position.x = Math.floor(Math.random() * 100 - 100) * 70;
		buildingMesh.position.z = Math.floor(Math.random() * 100 - 100) * 70;
		buildingMesh.rotation.y = Math.random()*Math.PI*2;
		buildingMesh.scale.x = Math.random() * 50 + 50;
		buildingMesh.scale.y = Math.random() * buildingMesh.scale.x * 25 + 50;
		buildingMesh.scale.z = Math.random() * 50 + 50;
		THREE.GeometryUtils.merge(cityGeometry, buildingMesh);
	}

	var material = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.2});
	var cityMesh = new THREE.Mesh(cityGeometry, material);
	world = cityMesh;
	scene.add(cityMesh);
};

var addCurveToScene = function() {

	spline = new THREE.SplineCurve3([
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 200, 0),
		new THREE.Vector3(150, 150, 0),
		new THREE.Vector3(150, 50, 50),
		new THREE.Vector3(250, 100, 0),
		new THREE.Vector3(-250, 100, -50),
		new THREE.Vector3(200, 200, -200),

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

var addSkyBoxToScene = function() {

	var cubeMap = new THREE.Texture([]);
	cubeMap.format = THREE.RGBFormat;
	cubeMap.flipY = false;

	var loader = new THREE.ImageLoader();
	loader.load('textures/skyboxsun25degtest.png', function (image) {

		var getSide = function (x, y) {

			var size = 1024;

			var canvas = document.createElement('canvas');
			canvas.width = size;
			canvas.height = size;

			var context = canvas.getContext('2d');
			context.drawImage(image, - x * size, - y * size);

			return canvas;

		};

		cubeMap.image[ 0 ] = getSide(2, 1); // px
		cubeMap.image[ 1 ] = getSide(0, 1); // nx
		cubeMap.image[ 2 ] = getSide(1, 0); // py
		cubeMap.image[ 3 ] = getSide(1, 2); // ny
		cubeMap.image[ 4 ] = getSide(1, 1); // pz
		cubeMap.image[ 5 ] = getSide(3, 1); // nz
		cubeMap.needsUpdate = true;
	});

	var cubeShader = THREE.ShaderLib['cube'];
	cubeShader.uniforms['tCube'].value = cubeMap;

	var skyBoxMaterial = new THREE.ShaderMaterial({
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry(1000000, 1000000, 1000000),
		skyBoxMaterial
	);
	
	scene.add(skyBox);
};

var addDirectionalLightToScene = function() {

	directionalLight = new THREE.DirectionalLight(0xffff55, 1);
	directionalLight.position.set(- 1, 0.4, - 1);
	scene.add(directionalLight);
};

var addWaterToScene = function() {

	waterNormals = new THREE.ImageUtils.loadTexture('textures/waternormals.jpg');
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

	water = new THREE.Water(renderer, camera, scene, {
		textureWidth: 512, 
		textureHeight: 512,
		waterNormals: waterNormals,
		alpha: 	1.0,
		sunDirection: directionalLight.position.normalize(),
		sunColor: 0xffffff,
		waterColor: 0x001e0f,
		distortionScale: 50.0,
	});

	mirrorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(parameters.width * 500, parameters.height * 500, 50, 50), 
		water.material
	);
	
	mirrorMesh.add(water);
	mirrorMesh.rotation.x = - Math.PI * 0.5;
	scene.add(mirrorMesh);
};