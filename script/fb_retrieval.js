function retrieveData(id){

  FB.api('/'+id, {fields: 'videos{source, title}'}, function(response) {
    console.log("video retrieval success");
    var videos = response.videos.data;
    displayVideoList(videos);
    return videos;
  });
}
