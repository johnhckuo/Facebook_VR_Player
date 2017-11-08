function retrieveData(id){
  $("body").loading('start');
  FB.api('/'+id, {fields: 'videos{source, title}'}, function(response) {
    console.log("video retrieval success");
    $("#videoList").fadeIn();
    videoRetrieved = true;
    gui_value.showVideoList = true;
    var videos = response.videos.data;
    displayVideoList(videos);
    return videos;
  });
}
