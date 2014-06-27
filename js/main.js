var app = angular.module('MyApp', []);

app.factory('CarFactory', function($http){
  return {
    getAll: function() {
      return $http.get('resources/cars.json');
    },
    getById: function(id) {
      return $http.get('resources/car' + id + '.json');
    }
  };
});

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })
    .when('/car/:id', {
      templateUrl: 'templates/detail.html',
      controller: 'DetailCtrl'
    }).otherwise({
      redirectTo: '/'
    });
});

app.controller('ListCtrl', function($scope, CarFactory) {
  $scope.filterText = '';
  CarFactory.getAll().success(function(cars){
    $scope.cars = cars;
  });
});

app.controller('DetailCtrl', function($scope, $routeParams, CarFactory) {
  CarFactory.getById($routeParams.id).success(function(car){
    $scope.car = car;
  });
});