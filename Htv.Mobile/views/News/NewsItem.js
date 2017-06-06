app.controller('NewsItemCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {

    $scope.loadNewsItem = function () {
        var newsItemResponce = dataService.getNewsItem($stateParams.id);

        newsItemResponce.then(
            function successCallback(newsItemResponseData) {
                var newsItem = dataService._parseToNewsItem(newsItemResponseData);

                $scope.newsItem = _createViewModel(newsItem);

            }, function errorCallback(response) {
                console.error(response);
            });
    };
   
    function _createViewModel(newsItem) {
       if (typeof (newsItems) == 'undefined' || newsItems == null) return null;
        
       return {
           id: newsItem.id,
           title: newsItem.title,
           subTitle: newsItem.subTitle,
           content: newsItem.Content,
           readCount: newsItem.ReadCount,
           video: newsItem.Video,
           img: newsItem.img,
           date: displayUtils.getDisplayDate(newsItem.date)
       }
    };
});
