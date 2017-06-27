app.controller('NewsItemCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {

    $scope.loadNewsItem = function () {
        var newsItemResponce = dataService.getNewsItem($stateParams.id);

        newsItemResponce.then(
            function successCallback(newsItemResponseData) {
                var newsItems = dataService._parseToNewsItem(newsItemResponseData);
                $scope.newsItem = _createViewModel(newsItems[0]);
            }, function errorCallback(response) {
                console.error(response);
            });

        var offset = null;
        if (typeof ($stateParams.categoryId) == 'undefined' || $stateParams.categoryId == null)
            offset = getRandomInt(10, 100);

        var relatedNewsList = dataService.getNewsList(10, offset, $stateParams.categoryId);
        relatedNewsList.then(
            function successCallback(newsItemsResponseData) {
                var newsItems = dataService._parseToNewsItem(newsItemsResponseData);
                var dataViewModel = _createViewModel(newsItems);
                $scope.relatedNewsItems = dataViewModel.slice(0, 5);
            }, function errorCallback(response) {
                console.error(response);
            });
    };

    function _createViewModel(newsItems) {
        if (newsItems instanceof Array) {
            var relatedNewsItems = [];

            for (var i = 0; i < newsItems.length; i++) {
                relatedNewsItems.push(
                    {
                        id: newsItems[i].id,
                        title: newsItems[i].title,
                        subTitle: newsItems[i].subTitle,
                        img: newsItems[i].img,
                        date: displayUtils.getDisplayDate(newsItems[i].date)
                    }
                );
            }
            return relatedNewsItems;
        }
        else if (typeof (newsItems) != 'undefined' && newsItems != null) {
            return {
                id: newsItems.id,
                title: newsItems.title,
                subTitle: newsItems.subTitle,
                content: newsItems.content,
                readCount: newsItems.readCount,
                video: newsItems.video,
                img: newsItems.img,
                date: displayUtils.getDisplayDate(newsItems.date)
            }
        }
    }

    // TODO: Put this method in global space!
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
