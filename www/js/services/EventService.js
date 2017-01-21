angular.module('App').factory('EventService', function($http, Settings, ApiEndpoint){
  var EventService = {
    query: function(lat, lng){
      var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
      if ( app ) {
        cordova.plugins.certificates.trustUnsecureCerts(true);
      } else {
        
      }

      return $http.get('/api/events?rows=' + Settings.eventsNum + '&point='+ lat + ',' + lng +'&radius=' + Settings.distance);

    }
  };
  return EventService;
}) ;
