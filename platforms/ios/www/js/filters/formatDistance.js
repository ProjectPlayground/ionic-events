angular.module('App').filter('formatDistance',  function () {
  return function(distance){
    var numDistance, unit;
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000,10);
        unit = 'm';
      }
      return numDistance + unit;

  }
});