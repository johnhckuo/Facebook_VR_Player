window.fbAsyncInit = function() {
  FB.init({
    appId      : '283657055472592',
    xfbml      : true,
    version    : 'v2.10'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response){
    retrieveData();
  });

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
