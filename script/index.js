var camera;
var scene;
var renderer;
var mesh;
var videoTexture;
var video;
var stats;
var controls;
var cubeLength = 500;

init();
animate();

function init() {
  stats = new Stats();
  document.body.appendChild(stats.dom);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);


  var light = new THREE.AmbientLight( 0xfffff ); // soft white light
  scene.add( light );

  var geometry = new THREE.CubeGeometry(cubeLength, cubeLength, cubeLength);

  video = document.getElementById( 'video' );
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  var material = new THREE.MeshPhongMaterial({ map: videoTexture, side: THREE.DoubleSide });

  var face1 = [new THREE.Vector2(0, .5), new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 1), new THREE.Vector2(0, 1)];
  var face2 = [new THREE.Vector2(.3333, .5), new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 1), new THREE.Vector2(.3333, 1)];
  var face3 = [new THREE.Vector2(.6666, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1), new THREE.Vector2(.6666, 1)];
  var face4 = [new THREE.Vector2(0, 0), new THREE.Vector2(.3333, 0), new THREE.Vector2(.3333, .5), new THREE.Vector2(0, .5)];
  var face5 = [new THREE.Vector2(.3333, 0), new THREE.Vector2(.6666, 0), new THREE.Vector2(.6666, .5), new THREE.Vector2(.3333, .5)];
  var face6 = [new THREE.Vector2(.6666, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5), new THREE.Vector2(.6666, .5)];

  geometry.faceVertexUvs[0] = [];

  geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
  geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

  geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
  geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

  geometry.faceVertexUvs[0][4] = [face3[0], face3[1], face3[3]];
  geometry.faceVertexUvs[0][5] = [face3[1], face3[2], face3[3]];

  geometry.faceVertexUvs[0][6] = [face4[0], face4[1], face4[3]];
  geometry.faceVertexUvs[0][7] = [face4[1], face4[2], face4[3]];

  geometry.faceVertexUvs[0][8] = [face5[0], face5[1], face5[3]];
  geometry.faceVertexUvs[0][9] = [face5[1], face5[2], face5[3]];

  geometry.faceVertexUvs[0][10] = [face6[0], face6[1], face6[3]];
  geometry.faceVertexUvs[0][11] = [face6[1], face6[2], face6[3]];

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -50;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener( 'change', render );


  window.addEventListener('resize', onWindowResize, false);

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
  render();
}
