app.controller('VideoCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {
    $scope.categoryName = $stateParams.categoryName;
    $scope.categoryKey = $stateParams.categoryKey;

    //ionicMaterialInk.displayEffect();
    $scope.noMoreItemsAvailable = false;
    $scope.limit = 10;
    $scope.offset = 10;

    //Functions
    $scope.loadVideos = function (limit, offset, category) {
        // Default values.
        limit = typeof limit !== 'undefined' ? limit : 10;
        offset = typeof offset !== 'undefined' ? offset : 0;
        category = typeof category !== 'undefined' ? category : $scope.categoryKey;

        var videosList = dataService.getVideosList(limit, offset, category);
        videosList.then(
            function successCallback(videosItemsResponseData) {
                debugger;
                var videoItems = dataService._parseToVideoItem(videosItemsResponseData);
                var dataViewModel = _createViewModel(videoItems);
                $scope.data = dataViewModel;
                $scope.highlightedItem = _createViewModel(videoItems[0]).videoItems[0];
            }, function errorCallback(response) {
                console.error(response);
            });

        return videosList;
    };

    function _createViewModel(videoItems) {
        var viewModel = { videoItems: [] }

        if (videoItems instanceof Array) {
            for (var i = 0; i < videoItems.length; i++) {
                // NOTE: The first element is highlightedItem.
                if (i === 0) continue;

                viewModel.videoItems.push(
                    {
                        id: videoItems[i].id,
                        title: videoItems[i].title,
                        description: videoItems[i].description,
                        img: videoItems[i].img,
                        date: displayUtils.getDisplayDate(videoItems[i].date),
                        source: videoItems[i].source
                    }
                );
            }
        }
        else if (typeof (videoItems) != 'undefined' && videoItems != null) {
            viewModel.videoItems.push(
                {
                    id: videoItems.id,
                    title: videoItems.title,
                    description: videoItems.description,
                    img: videoItems.img,
                    date: displayUtils.getDisplayDate(videoItems.date),
                    source: videoItems.source
                }
            );
        }
        return viewModel;
    }

    $scope.doRefresh = function () {
        $scope.loadNews();

        $scope.data = $scope.data;
        $scope.highlightedItem = $scope.data.videoItems[0];
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.loadMore = function () {

        var newTempData =
                [{
                    title: 'Nasko News!',
                    subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                    img: 'img/tyrion.jpg',
                    date: '10.02.2016',
                    duration: '10:34'
                },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 },
                 {
                     title: 'Nasko News!',
                     subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                     img: 'img/tyrion.jpg',
                     date: '10.02.2016'
                 }
                ];

        //TODO: Test code.
        if ($scope.data.videoItems.length > 15)
            $scope.noMoreItemsAvailable = true;

        $scope.data.videoItems = $scope.data.videoItems.concat(newTempData);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
})