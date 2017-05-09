// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('App', ['ionic', 'ionic-material']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|geo|tel|local):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/Start/Start.html',
            controller: 'StartCtrl'
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.newsList', {
            url: '/newsList:categoryName?categoryKey',
            views: {
                'menuContent': {
                    templateUrl: 'views/news/newsList.html',
                    controller: 'NewsCtrl'
                }
            }
        })
        .state('app.newsItem', {
            url: '/newsItem',
            views: {
                'menuContent': {
                    templateUrl: 'views/news/newsItem.html',
                    controller: 'NewsCtrl'
                }
            }
        })
        .state('app.videoList', {
            url: '/videoList:categoryName?categoryKey',
            views: {
                'menuContent': {
                    templateUrl: 'views/video/videoList.html',
                    controller: 'VideoCtrl'
                }
            }
        })
        .state('app.videoItem', {
            url: '/videoItem',
            views: {
                'menuContent': {
                    templateUrl: 'views/video/videoItem.html',
                    controller: 'VideoCtrl'
                }
            }
        })
        .state('app.liveTv', {
            url: '/liveTv',
            views: {
                'menuContent': {
                    templateUrl: 'views/liveTv/liveTv.html',
                    controller: 'LiveTvCtrl',
                }
            }
        })
        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'views/search/search.html',
                    controller: 'SearchCtrl',
                }
            }
        })

        .state('app.lists', {
            url: '/lists',
            views: {
                'menuContent': {
                    templateUrl: 'views/lists.html',
                    controller: 'ListsCtrl'
                }
            }
        })
        .state('app.ink', {
            url: '/ink',
            views: {
                'menuContent': {
                    templateUrl: 'views/ink.html',
                    controller: 'InkCtrl'
                }
            }
        })
        .state('app.motion', {
            url: '/motion',
            views: {
                'menuContent': {
                    templateUrl: 'views/motion.html',
                    controller: 'MotionCtrl'
                }
            }
        })
        .state('app.components', {
            url: '/components',
            views: {
                'menuContent': {
                    templateUrl: 'views/components.html',
                    controller: 'ComponentsCtrl'
                }
            }
        })
        .state('app.extensions', {
            url: '/extensions',
            views: {
                'menuContent': {
                    templateUrl: 'views/extensions.html',
                    controller: 'ExtensionsCtrl'
                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
