// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('App', ['ionic', 'ionic-material', 'pascalprecht.translate', 'vimeoEmbed']);

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

app.config(function ($stateProvider, $urlRouterProvider, $compileProvider, $translateProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|geo|tel|local):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
    $translateProvider.preferredLanguage("bg");
    $translateProvider.fallbackLanguage("en")

    $translateProvider.translations("bg", {
        // Week days.
        Monday: "Понеделник",
        Tuesday: "Вторник",
        Wednesday: "Сряда",
        Thursday: "Четвъртък",
        Friday: "Петък",
        Saturday: "Събота",
        Sunday: "Неделя",

        // Months.
        January: "Януари",
        February: "Февруари",
        March: "Март",
        April: "Април",
        May: "Май",
        June: "Юни",
        July: "Юли",
        August: "Август",
        September: "Септември",
        October: "Октомври",
        November: "Ноември",
        December: "Декември",

        // Contact Page
        ContactForm: "Контактна форма",
        OtherContacts: "Други начини",
        Send: "ИЗПРАТИ",
        Internet: " Интернет",
        Phone: "Телефон",
        Adress: "Адрес",

        // Side menu
        News: "Новини",
        Videos: "Видео",
        Support: "Подкрепа",
        Donation: "Направи дарение",
        More: "Още",
        Contacts: "Контакти",
        Other1: "Ето още начини, по които може да се свържете с нас. ",
        Other2: "Ние от HTV се радваме, когато полуаваме обратна връзка от нашите зрители. Ако искате да го направите или да се свържете с нас по други въпроси, може да използвате някой от следните начини за контакт:",
        Company: "Хармония ТВ",
        Street: "ул. Иван Рилски 16",
        City: "4003 Пловдив, България",

        // News Item Page
        Related: "Още новини",

        // Live TV Page
        AllInOne: "Всичко от HTV.bg на едно място!",
        Qualities: "Избери качество",
        LowQuality: "Ниско качество",
        HighQuality: "Високо качество",
        SdAvailable: "Достъпно и с мобилен интернет",
        HdAvailable: "Необходима е висока скорост",
        FullVersion: "Към пълната версия на HTV.bg",

        // Donation Page
        DonationIntro: "Нашата цел е чрез програмата на HTV да разпространяваме добри новини, изграждащи послания и позитивни събития, достъпни за всички възрастови категории, като предлагаме висококачествена телевизионна продукция за всеки дом. Като телевизия е важно да помагаме и на християните по целия свят, като им предоставяме програми и поучения свързани с Библията. Желанието ни е да развиваме телевизията като средство за позитивна промяна на хората. За да стане това реалност ни е необходима финансова подкрепа. С Вашето дарение, Вие можете да помогнете за осъществяването на тази благородна цел!",
        DonationTitle: "Може да направите дарение за HTV.bg по един от следните начини:",
        PayPal: "1. PayPal или с карта",
        BankTransfer: "2. Банков превод",
        PayPalTxt: "За да направиш дарение чрез PayPal натисни бутона за дарение или направи превод на donation@htv.bg.Също може да изпозлвате кредитна или дебитна карта в случай, че нямате PayPal регистрация.",
        BankTransferTxt: "В която и точка на земята да се намирате, може да направите банков превод в една от посочените сметки.",
        BGN: "Сметка в BGN:",
        EUR: "Сметка в EUR:",
        USD: "Сметка в USD:",
        DSK: "Банка: ДСК",
        FIBANK: "Банка: Първа Инвестиционна Банка",
        EURBANK: "Банка: Юробанк България",

        // Video Item Page
        LoadingVideo: "Зареждане на видео..."
    });

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
            url: '/newsItem:id?categoryKey',
            views: {
                'menuContent': {
                    templateUrl: 'views/news/newsItem.html',
                    controller: 'NewsItemCtrl'
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
            url: '/videoItem:id',
            views: {
                'menuContent': {
                    templateUrl: 'views/video/videoItem.html',
                    controller: 'VideoItemCtrl'
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
        .state('app.donation', {
            url: '/donation',
            views: {
                'menuContent': {
                    templateUrl: 'views/donation/donation.html'
                }
            }
        })
        .state('app.contacts', {
            url: '/contacts',
            views: {
                'menuContent': {
                    templateUrl: 'views/contacts/contacts.html'
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

    // NOTE: If none of the above states are matched, use this as the fall-back.
    $urlRouterProvider.otherwise('/app/home');
});
