// angular.module('app', []);

// angular.module('app').controller('testCtrl', function($scope){
//     $scope.test = "working!";
// });

angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource) {
    // $scope.jobs = [{ title: 'Sales Person', description: 'you will fight dragons' },
    //     { title: 'Accountant', description: 'you will use keyboard' }
    // ]
    $scope.jobs = $resource('/api/jobs').query();
});
