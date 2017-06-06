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
    };
   
    function _createViewModel(newsItem) {
        if (typeof (newsItem) == 'undefined' || newsItem == null) return null;
        
       return {
           id: newsItem.id,
           title: newsItem.title,
           subTitle: newsItem.subTitle,
           content: newsItem.content,
           readCount: newsItem.readCount,
           video: newsItem.video,
           img: newsItem.img,
           date: displayUtils.getDisplayDate(newsItem.date)
       }
    };
});
