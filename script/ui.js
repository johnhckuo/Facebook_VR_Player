var videoRetrieved = false;
var gui_value;

ui_init();
event_init();

function ui_init(){

    // dat gui
    gui_value = new initValue();
    var gui = new dat.GUI();

    var f1 = gui.addFolder('Video Source');
    f1.add(gui_value, 'page_Id');
    f1.add(gui_value, 'submit');

    var f2 = gui.addFolder('Video Controller');
    f2.add(gui_value, "Play");
    f2.add(gui_value, 'Pause');

    gui.add(gui_value, "showVideoList").onFinishChange(function(){
      if (!videoRetrieved){
        alert("You haven't search for any videos yet.");
        return;
      }

      if ($("#videoList").css("display") == "none"){
        $("#videoList").fadeIn();
      }else{
        $("#videoList").fadeOut();
      }
    }).listen();

}

function playVideo(src){

  video = document.getElementById( 'video' );
  video.autoplay = true;
  video.src = src;

  videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;

  cube.material.map = videoTexture;

}

function displayVideoList(videos){
  console.log(videos);
  for (var i = 0 ; i < videos.length ; i++){
    $(".videoTable tbody").append("<tr><th scope='row'>"+ (i+1) +"</th><td>"+videos[i].title+"</td><td><button type='button' class='btn btn-info' value="+videos[i].source+">Play</button></td></tr>");
  }
}

function initValue(){
  this.page_Id = '360vidz';
  this.speed = 1;
  this.showVideoList = false;
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
  this.Play = function(){
    video.play();
  }
  this.Pause = function(){
    video.pause();
  }
};

function event_init(){
  $(".videoTable").on("click", "button", function(){
    console.log(this.value);
    playVideo(this.value);
    $("#videoList").fadeOut();
    gui_value.showVideoList = false;
  });

  $(".listContainer").on("click", function(){
    $("#videoList").fadeOut();
    gui_value.showVideoList = false;
  });
}
