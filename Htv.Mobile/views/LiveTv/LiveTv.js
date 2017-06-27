angular.module('App').controller('LiveTvCtrl', function ($scope, $http, $ionicLoading, ionicMaterialInk, dataService ) {
    ionicMaterialInk.displayEffect();

    $scope.getSchedule = function () {
        var scheduleList = dataService.getSchedule();
        scheduleList.then(
            function successCallback(scheduleItemsResponseData) {
                // TODO: Use a view-model!
                $scope.data = scheduleItemsResponseData.data;
            }, function errorCallback(response) {
                console.error(response);
            });
    };
    
    $scope.doRefresh = function () {
        $scope.getSchedule();
        $scope.$broadcast('scroll.refreshComplete');
    };
})
