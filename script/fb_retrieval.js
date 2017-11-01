function retrieveData(id){

  FB.api('/'+id, {fields: 'videos{source}'}, function(response) {
    console.log("video retrieval success");
    var videos = response.videos.data;
    return videos;
  });
}
