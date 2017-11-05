var cube;
var videoTexture;
var video;
var cubeLength = 500;

aframe_init();

function aframe_init(){

  if (!Detector.webgl){
    alert("Your browser doesn't support webgl");
    return;
  }

  AFRAME.registerComponent('videocube', {
    init: function () {
        var el = this.el;  // Entity.

        //video cube

        var geometry = new THREE.CubeGeometry(cubeLength, cubeLength, cubeLength);

        video = document.getElementById( 'video' );
        videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        var material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });

        var oneThird = 1/3;
        var twoThird = 2/3;

        // each face has been shifted counter clockwise once
        var face1 = [new THREE.Vector2(0, 1), new THREE.Vector2(0, .5), new THREE.Vector2(oneThird, .5), new THREE.Vector2(oneThird, 1)];
        var face2 = [new THREE.Vector2(oneThird, 1), new THREE.Vector2(oneThird, .5), new THREE.Vector2(twoThird, .5), new THREE.Vector2(twoThird, 1)];
        var top = [new THREE.Vector2(twoThird, 1), new THREE.Vector2(twoThird, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1)];
        var bottom = [new THREE.Vector2(0, .5), new THREE.Vector2(0, 0), new THREE.Vector2(oneThird, 0), new THREE.Vector2(oneThird, .5)];
        var face3 = [new THREE.Vector2(oneThird, .5), new THREE.Vector2(oneThird, 0), new THREE.Vector2(twoThird, 0), new THREE.Vector2(twoThird, .5)];
        var face4 = [new THREE.Vector2(twoThird, .5), new THREE.Vector2(twoThird, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5)];

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

        el.setObject3D('mesh', cube);
    }
  });

}
