angular.module('App', ['ionic', 'ngCordova'])


.run(function($ionicPlatform, Nearby, $http, $ionicLoading, $state) {
    $ionicLoading.show();
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

   Nearby.getLocation();

  });
})
  .constant('ApiEndpoint', {
    url: 'https://api.eventfinda.com.au/v2/'
  })


.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('search', {
      url: '/search',
      controller: 'SearchEvents',
      templateUrl: 'views/search/search.html'
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsController',
      templateUrl: 'views/settings/settings.html'
    })
    .state('events', {
      cache: false,
      url: '/events/:city/:lat/:lng',
      controller: 'EventsController',
      templateUrl: 'views/event/eventList.html'
    })
    .state('eventDetail', {

      url: '/event/:id/:name',
      controller: 'EventDetailController',
      templateUrl: 'views/eventDetail/eventDetail.html'
    })
    ;
  $urlRouterProvider.otherwise('/events');
})

  .factory('Settings', function () {
    var Settings = {
      eventsNum: 10,
      distance: 5
    };
    return Settings;
  })

  .factory('Nearby', function($cordovaGeolocation, $http, $state, $ionicLoading){
    var Nearby = {

      location: {},
      getLocation: function(){
       var location = {};
        $cordovaGeolocation.getCurrentPosition().then(function (data) {

          $http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {latlng: data.coords.latitude + ',' + data.coords.longitude}})
            .success(function (response) {
              Nearby.location = {
                lat: data.coords.latitude,
                lng: data.coords.longitude,
                city: response.results[0].formatted_address,
                current: true
              };

              $state.go('events', Nearby.location,{reload: true});
            });
        })

      }
    };
    return Nearby;
  })

  .factory('Distance', function(){
    // convert numeric degress to radians
    var Distance = {
      toRad: function (value) {
        return value * Math.PI / 180;
      },
      Equirectangular: function(point1, point2) {
        var R = 6371; // earth radius in km
        var x = (Distance.toRad(point2.lon)-Distance.toRad(point1.lon)) *
          Math.cos((Distance.toRad(point1.lat)+Distance.toRad(point2.lat))/2);
        var y = (Distance.toRad(point2.lat)-Distance.toRad(point1.lat));
        return Math.sqrt(x*x + y*y) * R;
      }
    };
    return Distance;
  })

  .factory('Fav', function ($ionicPopup) {
    var Fav = {
      data: [],
      getIndex: function (item) {
        var index = -1;
        angular.forEach(Fav.data, function (event, i) {
          if (item.id == event.id) {
            index = i;
          }
        });
        return index;
      },
      add: function(item){
        var index = Fav.getIndex(item);
        if(index >= 0){
          $ionicPopup.alert({
            title: "Already favorited"
          });
        }
        else{
          Fav.data.push(item);
        }
      },
      remove: function(item){
        var index = Fav.getIndex(item);
        if(index >= 0){
          $ionicPopup.confirm({
            title: 'Are you sure?',
            template: 'This will remove ' + Fav.data[index].name
          }).then(function (res) {
            if (res) {
              Fav.data.splice(index, 1);
            }
          });
        }
      }
    };
    return Fav;
  })

.controller('SideMenuController', function($scope, Fav, Nearby, $ionicLoading, $ionicHistory){
    $scope.events = Fav.data;
    $scope.nearEvents = function(){
      $ionicLoading.show();
      $ionicHistory.clearCache();
        Nearby.getLocation();

    }
  });
