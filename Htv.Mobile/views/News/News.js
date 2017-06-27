app.controller('NewsCtrl', function ($scope, $stateParams, $http, dataService, displayUtils) {
    debugger;
    $scope.categoryName = $stateParams.categoryName;
    $scope.categoryKey = $stateParams.categoryKey;

    $scope.noMoreItemsAvailable = false;

    //Functions
    $scope.loadNews = function () {
        $http.get('').success(function (data) {

            var tempData = {
                newsItems: [
                    {
                        title: 'Arya Stark',
                        subTitle: 'The quickest way to a man\'s heart is through Arya\'s needle. She has two speeds: Walk and Kill, and is the reason why Waldo is still hiding.The quickest way to a man\'s heart is through Arya\'s needle. She has two speeds: Walk and Kill, and is the reason why Waldo is still hiding.',
                        img: 'img/news2.png',
                        date: '10.02.2016'
                    },
                    {
                        title: 'Video item - Даниел Коленда идва за съживителни събрания в България!',
                        subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                        img: 'img/news1.png',
                        date: '10.02.2016',
                        duration: '10:34'
                    },
                    {
                        title: 'Не пеем за пари! Честито Рождество Христово!',
                        subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                        img: 'img/news2.png',
                        date: '10.02.2016'
                    },
                    {
                        title: 'В София се проведе първата Европейска конференция „Вяра“',
                        subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                        img: 'img/news3.png',
                        date: '10.02.2016'
                    },
                    {
                        title: 'В София се проведе първата Европейска конференция „Вяра“',
                        subTitle: 'onsectetur adipiscing elit, sed do eiusmod tempor ...',
                        img: 'img/login.jpg',
                        date: '10.02.2016'
                    },
                ]
            };

            $scope.data = tempData;
            $scope.highlightedItem = tempData.newsItems[0];
        });
    };

    $scope.doRefresh = function () {
        $scope.loadNews();

        $scope.data = $scope.data;
        $scope.highlightedItem = $scope.data.newsItems[0];
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
        if ($scope.data.newsItems.length > 15)
            $scope.noMoreItemsAvailable = true;

        $scope.data.newsItems = $scope.data.newsItems.concat(newTempData);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

});
