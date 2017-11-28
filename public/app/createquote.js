
angular.module('myApp', ['ngResource']);
angular.module('myApp').controller('createquoteController',function($scope, $resource, $location) {
        $scope.role = "sales";  //This is role which can be changed to - pm or sales
        var quoteid = $location.search().q;
        $scope.quote = $resource('/api/quotes/:quoteid').query();
        console.log('JSON created: ' + $scope.quote); 
        //var day  = Date.now();
        //$scope.quotes = [{quote_id:1, quote_name:'First Sample Quote.', date_requested: day, request_by_user:'manoj', valid_from:day, valid_to:day, product_to_buy:'test', product_requested_price: 1.10, product_approved_price: 1.20, comment:'my comment', quote_status: 'Approved', approved_date: day, token:'adhlajdadasjld' }];
    });