angular.module('App').factory('CachedEvents', function(EventService, Fav){
  var eventList;

  return{
    query: function(lat, lng){
      if(!eventList){
        eventList = EventService.query(lat, lng);
      }
      return eventList;
    },
    cache: function(){
      if(eventList){

        return eventList;
      }
    },

    refresh: function(){
      return eventList = 0;
    }
  }
});