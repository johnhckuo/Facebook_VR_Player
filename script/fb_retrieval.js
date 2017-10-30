
function retrieveData(){
  FB.api('/me', {fields: 'last_name'}, function(response) {
    console.log(response);
  });
}
