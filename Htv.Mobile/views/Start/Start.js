app.controller('StartCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout, $http) {
    // Form data for the login modal
    $scope.loginData = {};

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    //var fab = document.getElementById('fab');
    //fab.addEventListener('click', function () {
    //    //location.href = 'https://twitter.com/satish_vr2011';
    //    window.open('https://twitter.com/satish_vr2011', '_blank');
    //});

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    $http.get('').success(function (data) {
        var temData = {
            newsCategories: [
                    { name: "България", key: "bulgaria" },
                    { name: "Църква",   key: "church" },
                    { name: "Катаклизми", key: "cataclysm" },
                    { name: "Политика", key: "politics" },
                    { name: "Израел", key: "izrael" },
                    { name: "Събития", key: "events" },
                    { name: "Наука", key: "science" },
                    { name: "Коментари", key: "comments" },
                    { name: "Истории", key: "stories" },
            ],
            videoCategories: [
                 { name: "Концерти", key: "1" },
                 { name: "Филми", key: "2" },
                 { name: "За децата", key: "3" },
                 { name: "Предавания", key: "4" },
                 { name: "Конференции", key: "5" },
                 { name: "Танци", key: "6" },
                 { name: "Нова Вълна", key: "7" },
                 { name: "Свидетелства", key: "8" },
            ]
        };
        $scope.dataTypes = temData;
    });
});