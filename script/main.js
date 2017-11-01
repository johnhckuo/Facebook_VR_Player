var camera;
var scene;
var renderer;
var cube;
var videoTexture;
var video;
var stats;
var controls;
var cubeLength = 50;

threejs_init();
ui_init();
event_init();
animate();

function playVideo(src){
  $("#video source").attr("src", src);

  video = document.getElementById( 'video' );
  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;



  cube.material.map = videoTexture;

  // // instantiate a loader
  // var loader = new THREE.TextureLoader();
  //
  // loader.setCrossOrigin("anonymous");
  // // load a resource
  // loader.load(
  // 	// resource URL
  // 	src,
  // 	// Function when resource is loaded
  // 	function ( texture ) {
  // 		// do something with the texture
  // 		// var material = new THREE.MeshBasicMaterial( {
  // 		// 	map: texture
  // 		//  } );
  //     cube.material.map = texture;
  // 	},
  // 	// Function called when download progresses
  // 	function ( xhr ) {
  // 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  // 	},
  // 	// Function called when download errors
  // 	function ( xhr ) {
  //     console.log(xhr);
  // 		console.log( 'An error happened');
  // 	}
  // );

}

function displayVideoList(videos){
  console.log(videos);
  for (var i = 0 ; i < videos.length ; i++){
    $(".videoTable tbody").append("<tr><th scope='row'>"+ (i+1) +"</th><td>"+videos[i].title+"</td><td><button type='button' class='btn' value="+videos[i].source+">Play</button></td></tr>");
  }
}

function initValue(){
  this.page_Id = '360vidz';
  this.speed = 1;
  this.pause = false;
  this.submit = function() {
    var _id = this.page_Id;
    FB.getLoginStatus(function(response){
      if (response.status != "connected"){
        alert("You haven't login yet!");
        return;
      }
      retrieveData(_id);
    });
  };
};

function threejs_init() {

  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 1;

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

  cube = new THREE.Mesh(geometry, material);
  cube.position.z = 1;
  cube.material.map.needsUpdate = true;
  cube.material.needsUpdate = true;
  // cube.material.texture.needsUpdate = true;
  cube.needsUpdate = true;

  scene.add(cube);

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  // track ball controller
  controls = new THREE.TrackballControls( camera, renderer.domElement );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  controls.addEventListener( 'change', render );


  window.addEventListener( 'resize', onWindowResize, false );

  render();
}

function ui_init(){

    // stat
    stats = new Stats();
    container.appendChild( stats.dom );

    // dat gui
    var value = new initValue();
    var gui = new dat.GUI();

    var f1 = gui.addFolder('Video Source');
    f1.add(value, 'page_Id');
    f1.add(value, 'submit');

    var f2 = gui.addFolder('Video Controller');
    f2.add(value, 'speed', 0, 2);
    f2.add(value, 'pause');


}

function event_init(){
  $(".videoTable").on("click", "button", function(){
    console.log(this.value);
    playVideo(this.value);
  });
}

function animate() {

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
