angular.module('App').factory('EventService', function($http, Settings, ApiEndpoint){
  var EventService = {
    query: function(lat, lng){
     /* return $http.jsonp(ApiEndpoint.url + 'events.json?callback=?rows=', function(){
          return {
            row: Settings.eventsNum,
            point: lat + ',' + lng,
            radius:
          }
        } +Settings.eventsNum + '&point='+ lat + ',' + lng +'&radius=' + Settings.distance,
        {
          headers: {Authorization:'Basic ZXZlbnRhdXM6dGtieDNmZzV6ZjNu'}
        })*/
      return $http.get('/api/events?rows=' + Settings.eventsNum + '&point='+ lat + ',' + lng +'&radius=' + Settings.distance);

      /*return $http.jsonp( ApiEndpoint.url + 'events.json?callback=JSON_CALLBACK' + '&rows=' +Settings.eventsNum + '&point='+ lat + ',' + lng +'&radius=' + Settings.distance,
        {
          headers: {Authorization:'Basic ZXZlbnRhdXM6dGtieDNmZzV6ZjNu'}
        });*/
      }
  };
  return EventService;
}) ;
