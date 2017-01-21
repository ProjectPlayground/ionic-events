angular.module('App').controller('EventDetailController', function($scope, CachedEvents, $stateParams, Fav){
  $scope.params = $stateParams;
  return CachedEvents.cache().success(function(collection){
    if(Fav.data.length >= 0){
      angular.forEach(Fav.data, function(event){
        event.favorite = true;
       collection.events.push(event);
      });
    }
    angular.forEach(collection.events, function(event){
      if(event.id == $stateParams.id){
        $scope.event = event;

      }


    });
    $scope.toggleFav = function(){
      $scope.event.favorite = true;
     Fav.add($scope.event);

    };
  })
})