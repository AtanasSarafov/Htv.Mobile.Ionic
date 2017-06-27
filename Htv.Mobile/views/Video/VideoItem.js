app.controller('VideoItemCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {

    $scope.loadVideoItem = function () {
        var videoItemResponce = dataService.getVideoItem($stateParams.id);

        videoItemResponce.then(
            function successCallback(videoItemResponseData) {
                debugger;
                var videoItems = dataService._parseToVideoItem(videoItemResponseData);

                $scope.videoItem = _createViewModel(videoItems[0]);

            }, function errorCallback(response) {
                console.error(response);
            });
    };

    function _createViewModel(videoItem) {
        if (typeof (videoItem) == 'undefined' || videoItem == null) return null;

        return {
            id: videoItem.id,
            title: videoItem.title,
            description: videoItem.description,
            content: videoItem.content,
            type: videoItem.type,
            readCount: videoItem.readCount,
            img: videoItem.img,
            imgBig: videoItem.imgBig,
            date: displayUtils.getDisplayDate(videoItem.date),
            length: videoItem.length,
            source: videoItem.source,
            videoUrl: videoItem.videoUrl
        }
    };

    $scope.loadVideo = function () {
        var videoItem = $scope.videoItem;

        var videoUrl = videoItem.videoUrl;
        // This is the oEmbed endpoint for Vimeo (we're using JSON)
        // (Vimeo also supports oEmbed discovery. See the PHP example.)
        var endpoint = 'http://www.vimeo.com/api/oembed.json';
        // Tell Vimeo what function to call
        var callback = 'embedVideo';
        // Put together the URL
        var url = endpoint + '?url=' + encodeURIComponent(videoUrl) + '&callback=' + callback + '&width=640';
        // This function puts the video on the page
        function embedVideo(video) {
            document.getElementById('embed').innerHTML = unescape(video.html);
        }
        // This function loads the data from Vimeo
        function init() {
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', url);
            document.getElementsByTagName('head').item(0).appendChild(js);
        }
        // Call our init function when the page loads
        //window.onload = init;
    };
});
