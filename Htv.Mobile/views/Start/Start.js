app.controller('StartCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $http, dataService) {
   
    //Functions
    $scope.loadCategories = function () {
        debugger;
        var categories = dataService.getCategories();
        categories.then(
            function successCallback(categoriesResponseData) {
                var categoriesItems = dataService._parseToCategoryItem(categoriesResponseData);
                var dataViewModel = _createViewModel(categoriesItems);
                $scope.data = dataViewModel;
            }, function errorCallback(response) {
                console.error(response);
            });
    };

    function _createViewModel(categoriesItems) {
        var viewModel = {
            newsCategories: [],
            videoCategories: []
        }

        if (categoriesItems.newsCategories instanceof Array) {
            for (var i = 0; i < categoriesItems.newsCategories.length; i++) {
                viewModel.newsCategories.push(
                    {
                        name: categoriesItems.newsCategories[i].title,
                        key: categoriesItems.newsCategories[i].id,
                    }
                );
            }
        }

        if (categoriesItems.videoCategories instanceof Array) {
            for (var i = 0; i < categoriesItems.videoCategories.length; i++) {
                viewModel.videoCategories.push(
                    {
                        name: categoriesItems.videoCategories[i].title,
                        key: categoriesItems.videoCategories[i].id,
                    }
                );
            }
        }

        return viewModel;
    }

    //#region: TODO: Check this code!
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    var template = '<ion-popover-view>' +
        '   <ion-header-bar>' +
        '       <h1 class="title">My Popover Title</h1>' +
        '   </ion-header-bar>' +
        '   <ion-content class="padding">' +
        '       My Popover Contents' +
        '   </ion-content>' +
        '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    //#endregion
});