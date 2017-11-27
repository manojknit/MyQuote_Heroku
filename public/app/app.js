
angular.module('myApp', ['ngResource']);
angular.module('myApp').controller('myController',function($scope, $resource) {
        $scope.msg = "MyQuote App";
        $scope.quotes = $resource('/api/quotes').query();
        console.log('JSON created: ' + $scope.quotes); 
        //var day  = Date.now();
        //$scope.quotes = [{quote_id:1, quote_name:'First Sample Quote.', date_requested: day, request_by_user:'manoj', valid_from:day, valid_to:day, product_to_buy:'test', product_requested_price: 1.10, product_approved_price: 1.20, comment:'my comment', quote_status: 'Approved', approved_date: day, token:'adhlajdadasjld' }];
    });