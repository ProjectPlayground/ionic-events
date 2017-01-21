angular.module('App').controller('SearchEvents', function($scope, $http){
  $scope.model = {term: ''};

  /*$scope.search = function(){
    if($scope.model.term !="") {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?components=country:AU',
        {params: {address: $scope.model.term}})
        .success(function(response){
          $scope.results = response.results;
        })
    }
    else {
      $scope.results ={};
    }
  };*/

  $scope.search = function(){
    $scope.results ={};
    if($scope.model.term!="") {
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?components=country:AU',
        {params: {address: $scope.model.term}})
        .success(function(response){
          if(response.results.length==1 && response.results[0].formatted_address=="Australia") {
            $scope.results ={};
          }
          else $scope.results = response.results;
        })
    }
  };

  /*$scope.search = function(){
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?components=country:AU', {params: {address: $scope.model.term}})
      .success(function(response){
        $scope.results = response.results;
      })
  };*/
});