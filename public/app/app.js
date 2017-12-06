
angular.module('myApp', ['ngResource']);
angular.module('myApp').controller('myController',function($scope, $resource) {
        $scope.title = "MyQuote App";
        $scope.quotes = $resource('/api/quotes').query();
        console.log('JSON created: ' + $scope.quotes); 
        //var day  = Date.now();
        //$sc
        
    });