﻿app.controller('NewsCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {
    $scope.categoryName = $stateParams.categoryName;
    $scope.categoryKey = $stateParams.categoryKey;

    $scope.noMoreItemsAvailable = false;

    //Functions
    $scope.loadNews = function (limit, offset, category) {
        // Default values.
        limit = typeof limit !== 'undefined' ? limit : 10;
        offset = typeof offset !== 'undefined' ? offset : 0;
        category = typeof category !== 'undefined' ? category : $scope.categoryKey;
        var newsList = dataService.getNewsList(limit, offset, category);
        newsList.then(
            function successCallback(newsItemsResponseData) {
                var newsItems = dataService._parseToNewsItem(newsItemsResponseData);
                var dataViewModel = _createViewModel(newsItems);
                $scope.data = dataViewModel;
                $scope.highlightedItem = _createViewModel(newsItems[0]).newsItems[0];
            }, function errorCallback(response) {
                console.error(response);
            });
    };

    $scope.loadVideos = function () {
        $http.get('').success(function (data) {

            $ionicLoading.hide();

            var tempData = {
                newsItems: [
                    {
                        title: 'Arya Stark',
                        subTitle: 'The quickest way to a man\'s heart is through Arya\'s needle. She has two speeds: Walk and Kill, and is the reason why Waldo is still hiding.The quickest way to a man\'s heart is through Arya\'s needle. She has two speeds: Walk and Kill, and is the reason why Waldo is still hiding.',
                        img: 'img/news2.png',
                        date: '10.02.2016'
                    },
                    {
                        title: 'Video item - Äàíèåë Êîëåíäà èäâà çà ñúæèâèòåëíè ñúáðàíèÿ â Áúëãàðèÿ!',
                        subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                        img: 'img/news1.png',
                        date: '10.02.2016',
                        duration: '10:34'
                    }
                ]
            };

            $scope.data = tempData;
            $scope.highlightedItem = tempData.newsItems[0];
        });
    };

    $scope.doRefresh = function () {
        $scope.loadNews();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.loadMore = function () {
        var newsList = dataService.getNewsList($scope.limit, $scope.offset, null);

        newsList.then(
            function successCallback(newsItemsResponseData) {
                var newsItems = dataService._parseToNewsItem(newsItemsResponseData);
                var dataViewModel = _createViewModel(newsItems);

                $scope.data.newsItems = $scope.data.newsItems.concat(dataViewModel.newsItems);

                //TODO: Test code.
                if ($scope.data.newsItems.length > 40)
                    $scope.noMoreItemsAvailable = true;

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.offset += $scope.offset;

            }, function errorCallback(response) {
                console.error(response);
            });
    };

    function _createViewModel(newsItems) {
        var viewModel = { newsItems: [] }

        if (newsItems instanceof Array) {
            for (var i = 0; i < newsItems.length; i++) {
                // NOTE: The first element is highlightedItem.
                if (i === 0) continue;

                viewModel.newsItems.push(
                    {
                        id: newsItems[i].id,
                        title: newsItems[i].title,
                        subTitle: newsItems[i].subTitle,
                        img: newsItems[i].img,
                        date: displayUtils.getDisplayDate(newsItems[i].date),
                        readCount: newsItems[i].readCount
                    }
                );
            }
        }
        else if (typeof (newsItems) != 'undefined' && newsItems != null) {
            viewModel.newsItems.push(
                {
                    id: newsItems.id,
                    title: newsItems.title,
                    subTitle: newsItems.subTitle,
                    img: newsItems.img,
                    date: displayUtils.getDisplayDate(newsItems.date)
                }
            );
        }
        return viewModel;
    }
});
