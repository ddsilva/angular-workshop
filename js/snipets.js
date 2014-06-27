// Cars
$scope.cars = [{
  "id": 1,
  "manufacturer": "Porsche",
  "model": "911",
  "price": 135000,
  "wiki": "http://en.wikipedia.org/wiki/Porsche_997"
},{
  "id": 2,
  "manufacturer": "Nissan",
  "model": "GT-R",
  "price": 80000,
  "wiki":"http://en.wikipedia.org/wiki/Nissan_Gt-r"
},{
  "id": 3,
  "manufacturer": "BMW",
  "model": "M3",
  "price": 60500,
  "wiki":"http://en.wikipedia.org/wiki/Bmw_m3"
},{
  "id": 4,
  "manufacturer": "Audi",
  "model": "S5",
  "price": 53000,
  "wiki":"http://en.wikipedia.org/wiki/Audi_S5#Audi_S5"
},{
  "id": 5,
  "manufacturer": "Audi",
  "model": "TT",
  "price": 40000,
  "wiki":"http://en.wikipedia.org/wiki/Audi_TT"
}];

// Module
var app = angular.module('MyApp', []);

// Car factory
app.factory('CarsFactory', function($http){
  return {
    getAll: function() {
      return $http.get('resources/cars.json');
    },
    getById: function(id) {
      return $http.get('resources/car' + id + '.json');
    }
  };
});

// Router

app.config(function($routeProvider){
  $routeProvider
    .when('', {
      templateUrl: 'templates/list.html',
      controller: 'ListCtrl'
    })
    .when('car/:id', {
      templateUrl: 'detail.html',
      controller: 'DetailCtrl'
    }).otherwise({
      redirectTo: ''
    });
});

// Controllers
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