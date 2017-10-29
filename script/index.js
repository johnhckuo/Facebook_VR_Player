var camera;
var scene;
var renderer;
var mesh;
var videoTexture;
var video;
var stats;
var controls;
var cubeLength = 50;

init();
animate();

function init() {

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  stats = new Stats();
  document.body.appendChild(stats.dom);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 1;

  controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', render );

  //light

  var light = new THREE.AmbientLight( 0xfffff ); // soft white light
  scene.add( light );

  //video cube

  var geometry = new THREE.CubeGeometry(cubeLength, cubeLength, cubeLength);

  video = document.getElementById( 'video' );
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  var material = new THREE.MeshPhongMaterial({ map: videoTexture, side: THREE.DoubleSide });

  // each face has been shifted counter clockwise once
  var face1 = [new THREE.Vector2(0, 1), new THREE.Vector2(0, .5), new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 1)];
  var face2 = [new THREE.Vector2(.3333, 1), new THREE.Vector2(.3333, .5), new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 1)];
  var top = [new THREE.Vector2(.6666, 1), new THREE.Vector2(.6666, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1)];
  var bottom = [new THREE.Vector2(0, .5), new THREE.Vector2(0, 0), new THREE.Vector2(.3333, 0), new THREE.Vector2(.3333, .5)];
  var face3 = [new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 0), new THREE.Vector2(.6666, 0), new THREE.Vector2(.6666, .5)];
  var face4 = [new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5)];

  //This clears out any UV mapping that may have already existed on the cube.
  geometry.faceVertexUvs[0] = [];

  //UV mapping start
  geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
  geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

  geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
  geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

  geometry.faceVertexUvs[0][4] = [top[0], top[1], top[3]];
  geometry.faceVertexUvs[0][5] = [top[1], top[2], top[3]];

  geometry.faceVertexUvs[0][6] = [bottom[0], bottom[1], bottom[3]];
  geometry.faceVertexUvs[0][7] = [bottom[1], bottom[2], bottom[3]];

  geometry.faceVertexUvs[0][8] = [face3[0], face3[1], face3[3]];
  geometry.faceVertexUvs[0][9] = [face3[1], face3[2], face3[3]];

  geometry.faceVertexUvs[0][10] = [face4[0], face4[1], face4[3]];
  geometry.faceVertexUvs[0][11] = [face4[1], face4[2], face4[3]];

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = 1;
  scene.add(mesh);

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  stats = new Stats();
  container.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );

  render();
}

function animate() {
  // mesh.rotation.x += 0.02;
  // mesh.rotation.y += 0.01;

  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();

}

function render() {
  renderer.render(scene, camera);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  render();
}
