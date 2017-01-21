angular.module('App')
  .controller('EventsController', function ($scope, $http, $stateParams, Nearby, Settings, CachedEvents, $ionicActionSheet, Fav, Distance, $ionicModal, $ionicLoading) {
    $scope.params = $stateParams;
    $scope.settings = Settings;

    $scope.loadEvents = function(){
      $ionicLoading.show();
      CachedEvents.refresh();
      CachedEvents.query($stateParams.lat, $stateParams.lng)
        .success(function (data) {
          var ptOne = {
            lat: Nearby.location.lat,
            lon: Nearby.location.lng
          };
          $scope.events = data.events;
          angular.forEach($scope.events, function(event){
            event.distance = Distance.Equirectangular(ptOne, {lat: event.point.lat, lon: event.point.lng});
            event.startDateTime = new Date(event.datetime_start.replace(/-/g, '/'));
            event.endDateTime = new Date(event.datetime_end.replace(/-/g, '/'));
            event.currentTime = new Date();
            //event.image = event.images.images[0].transforms.transforms[4]? event.images.images[0].transforms.transforms[4].url.replace("http://","https://")  : event.images.images[0].transforms.transforms[3]?  event.images.images[0].transforms.transforms[3].url.replace("http://","https://")  : event.images.images[0].transforms.transforms[2]?  event.images.images[0].transforms.transforms[2].url.replace("http://","https://")  : event.images.images[0].transforms.transforms[1]?  event.images.images[0].transforms.transforms[1].url.replace("http://","https://")  :   event.images.images[0].transforms.transforms[0].url.replace("http://","https://") ;
            event.image = event.images.images[0].transforms.transforms[4]? event.images.images[0].transforms.transforms[4].url.replace("http://","https://").replace("^\?.*","")  : event.images.images[0].transforms.transforms[3]?  event.images.images[0].transforms.transforms[3].url.replace("http://","https://").replace("^\?.*","")  : event.images.images[0].transforms.transforms[2]?  event.images.images[0].transforms.transforms[2].url.replace("http://","https://").replace("^\?.*","")  : event.images.images[0].transforms.transforms[1]?  event.images.images[0].transforms.transforms[1].url.replace("http://","https://").replace("^\?.*","")  :   event.images.images[0].transforms.transforms[0].url.replace("http://","https://").replace("^\?.*","") ;
          });

          $ionicLoading.hide();
        })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
          $ionicLoading.hide();
        });
    };
    $scope.loadEvents();

   /* $scope.scrollBottom = function(){
      $scope.eventsNum = Settings.eventsNum;
      Settings.eventsNum += 10;
      $scope.loadEvents();
    };*/
    /*$scope.$on('$ionicView.Enter', function () {
      $scope.loadEvents();
    })*/


  });
