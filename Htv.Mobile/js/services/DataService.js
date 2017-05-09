angular.module('App').service('dataService', function ($http) {

    var htvMainUrl = "https://www.htv.bg";
    var htvDataUrl = "https://www.htv.bg/rpcdata";
    var categoriesPath = "/categories";       // | Required: identity | Optional:
    var newsListPath = "/news-list";          // | Required: identity | Optional: limit, offset, categoryId
    var videosListPath = "/videos-list";      // | Required: identity | Optional: limit, offset, categoryId
    var newsPath = "/news";                   // | Required: identity, id | Optional:
    var videoPath = "/video";                 // | Required: identity, id | Optional:
    var searchVideosPath = "/search-videos";  // | Required: identity, search | Optional: limit, offset
    var searchNewsPath = "/search-news";      // | Required: identity, search | Optional: limit, offset
    var identityKey = "e29dd4f8bdc52ee3d70a49e2e04cd465adfa020d22a2ed7c420678de91d9bb42";

    this.getNewsList = function (limit, offset, categoryId) {
        var requestData = null;

        if (limit || offset || categoryId)
            requestData = {
                limit: limit,
                offset: offset,
                categoryId: categoryId
            };

        var newsItemsResponseData = this._httpPost(htvDataUrl + newsListPath, requestData)
        
        return newsItemsResponseData;
    }

    this.getVideosList = function () {
        var videosItems = this._httpPost(htvDataUrl + videosListPath)
        return videosItems;
    }

    this.getCategories = function () {
        var categories = this._httpPost(htvDataUrl + categoriesPath)
        return categories;
    }

    // NOTE [atanassarafov, 05072017]: This method works directly on the response data,
    // which structure it is very likely to be changed.
    this._parseToNewsItem = function (data) {
        var newsItems = [];
        var dataNewsItems = data.data.newsItems;

        if (data && dataNewsItems instanceof Array) {
            for (var i = 0; i < dataNewsItems.length; i++) {
                var item = dataNewsItems[i];
                newsItems.push(
                    {
                        title: item.Title,
                        subTitle: item.SubTitle,
                        img: htvMainUrl + item.Thumb,
                        date: item.DisplayDate
                    }
                )
            }
        }

        return newsItems;
    }

    this._httpPost = function (url, data) {
        var data;
        $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
        $http.defaults.headers.common.ContentType = 'application/x-www-form-urlencoded';

        var requestData = { identity: identityKey };
        if (data)
            requestData = $.extend({}, data, requestData);

        return $http({
            method: 'POST',
            url: htvDataUrl + newsListPath,
            headers: {
                'identity': identityKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: requestData
        });
        // NOTE: This function will be called outside of the current scope.
        //.then(
        //function successCallback(response) {
        //    data = response;
        //}, function errorCallback(response) {
        //    console.error(response);
        //});

        //return data;
    }
});