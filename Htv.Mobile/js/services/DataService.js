angular.module('App').service('dataService', function ($http) {

    var htvMainUrl = "https://www.htv.bg";
    var htvDataUrl = "https://www.htv.bg/rpcdata";
    var vimeoUrl = "http://www.vimeo.com/";
    var schedulePath = "/schedule";           // | Required: | Optional:
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

        return this._httpPost(htvDataUrl + newsListPath, requestData);
    };

    // TODO: Catch NOT FOUND ITEM!
    this.getNewsItem = function (id) {
        if (typeof (id) == undefined || id == null) return;

        var requestData = { id: id };

        return this._httpPost(htvDataUrl + newsPath, requestData);
    };

    this.getVideosList = function (limit, offset, categoryId) {
        var requestData = null;

        if (limit || offset || categoryId)
            requestData = {
                limit: limit,
                offset: offset,
                categoryId: categoryId
            };

        return this._httpPost(htvDataUrl + videosListPath, requestData);
    };

    // TODO: Catch NOT FOUND ITEM!
    this.getVideoItem = function (id) {
        if (typeof (id) == undefined || id == null) return;

        var requestData = { id: id };

        return this._httpPost(htvDataUrl + videoPath, requestData);
    };

    this.getCategories = function () {
        var categories = this._httpPost(htvDataUrl + categoriesPath)
        return categories;
    };

    this.getSchedule = function () {
        var schedule = this._httpPost(htvDataUrl + schedulePath)
        return schedule;
    }

    this.searchNews = function (limit, offset, search) {
        if (limit || offset || search)
            requestData = {
                limit: limit,
                offset: offset,
                search: search
            };

        return this._httpPost(htvDataUrl + searchNewsPath, requestData);
    }

    this.searchVideos = function (limit, offset, search) {
        if (limit || offset || search)
            requestData = {
                limit: limit,
                offset: offset,
                search: search
            };

        return this._httpPost(htvDataUrl + searchVideosPath, requestData);
    }

    // NOTE [atanassarafov, 05072017]: This method works directly on the response data,
    // which structure it is very likely to be changed.
    this._parseToNewsItem = function (data) {
        var newsItems = [];
        var dataNewsItems = data.data.newsItems;
        var singleNewsItem = data.data.news;

        if (data && dataNewsItems instanceof Array) {
            for (var i = 0; i < dataNewsItems.length; i++) {
                var item = dataNewsItems[i];
                newsItems.push(
                    {
                        id: item.Id,
                        title: item.Title,
                        subTitle: item.SubTitle,
                        img: htvMainUrl + item.Thumb,
                        date: item.DisplayDate,
                        readCount: item.readCount  //this single row is added by KVF
                    }
                )
            }
        }
        else if (typeof (singleNewsItem) != 'undefined' && singleNewsItem != null) {
            newsItems.push(
                {
                    id: singleNewsItem.Id,
                    title: singleNewsItem.Title,
                    subTitle: singleNewsItem.SubTitle,
                    content: singleNewsItem.Content,
                    readCount: singleNewsItem.ReadCount,
                    img: htvMainUrl + singleNewsItem.Image,
                    date: singleNewsItem.DisplayDate,
                    video: singleNewsItem.Video
                }
            );
        }

        return newsItems;
    };

    this._parseToVideoItem = function (data) {
        var videoItems = [];
        var dataVideoItems = data.data.videoItems;
        var singleVideoItem = data.data.video;

        if (data && dataVideoItems instanceof Array) {
            for (var i = 0; i < dataVideoItems.length; i++) {
                var item = dataVideoItems[i];
                videoItems.push(
                    {
                        id: item.Id,
                        title: item.Title,
                        description: item.Description,
                        img: item.Thumb,
                        date: item.Added,
                        source: item.Source
                    }
                )
            }
        }
        else if (typeof (singleVideoItem) != 'undefined' && singleVideoItem != null) {
            videoItems.push(
                {
                    id: singleVideoItem.Id,
                    title: singleVideoItem.Title,
                    description: singleVideoItem.Description,
                    content: singleVideoItem.Content,
                    type: singleVideoItem.Type,
                    readCount: singleVideoItem.Loaded,
                    img: singleVideoItem.Thumb,
                    imgBig: singleVideoItem.ThumbBig,
                    date: singleVideoItem.Added,
                    length: singleVideoItem.Length,
                    source: singleVideoItem.Source,
                    videoUrl: vimeoUrl + singleVideoItem.Source
                }
            );
        }

        return videoItems;
    }

    this._parseToCategoryItem = function (data) {
        var categoryItems = {
            newsCategories: [],
            videoCategories: []
        }

        var dataNewsCategoriesItems = data.data.data.newsCategories;
        var dataVideoCategoriesItems = data.data.data.videoCategories;

        for (var i = 0; i < dataNewsCategoriesItems.length; i++) {
            var item = dataNewsCategoriesItems[i];
            categoryItems.newsCategories.push(
                {
                    id: item.Id,
                    title: item.Title
                }
            )
        }

        for (var i = 0; i < dataVideoCategoriesItems.length; i++) {
            var item = dataVideoCategoriesItems[i];
            categoryItems.videoCategories.push(
                {
                    id: item.Id,
                    title: item.Title
                }
            )
        }

        return categoryItems;
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
            url: url,
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
    };
});
