angular.module('App')
  .controller('SettingsController', function ($scope, Settings, Fav) {
    $scope.settings = Settings;
    $scope.events = Fav.data;
    $scope.canDelete = false;
    $scope.remove = function (index) {
      Fav.remove(Fav.data[index]);
    };
  });