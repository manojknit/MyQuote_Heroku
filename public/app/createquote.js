
angular.module('myApp', ['ngResource']);
angular.module('myApp').controller('createquoteController',function($scope, $resource, $location, $http) {
        $scope.role = "sales";  //This is role which can be changed to - pm or sales

        keyhalf ="CPPvh1zzOfRddpTc";
        var absUrl = $location.absUrl();
        var url = new URL(absUrl);
        var quoteid = url.searchParams.get("quoteid");
        var appendapi = "duEozg9yLd3Xpr"
        $scope.quoteid = quoteid;
        var actiontype = '/quote/create';
        if(quoteid != null)
            actiontype = '/quote/update';
        $scope.actionUrl = actiontype;
        var API_sec = appendapi+keyhalf;
        var urlQuery = "https://api.mlab.com/api/1/databases/quotedb/collections/quote_tables?q={'quote_id':"+quoteid+"}&apiKey="+API_sec; 
        //var urlQuery = '/api/quotes/:quoteid';
        //$scope.quote = $resource(urlQuery).query();
        //https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd   rest

        $http.get(urlQuery).
        then(function(response) {
            $scope.quote = response.data[0];
        });
        console.log('JSON created: ' + $scope.quote); 
        //var day  = Date.now();
        //$scope.quotes = [{quote_id:1, quote_name:'First Sample Quote.', date_requested: day, request_by_user:'manoj', valid_from:day, valid_to:day, product_to_buy:'test', product_requested_price: 1.10, product_approved_price: 1.20, comment:'my comment', quote_status: 'Approved', approved_date: day, token:'adhlajdadasjld' }];

        // this.GoHome = function() {
        //     //Post call by param
        //     $location.path("/")
        
        // };

    });