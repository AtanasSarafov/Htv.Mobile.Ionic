angular.module('App').controller('LiveTvCtrl', function ($scope, $http, $ionicLoading, ionicMaterialInk) {
    ionicMaterialInk.displayEffect();

    $scope.getSchedule = function () {
        $http.get('').success(function (data) {
            $ionicLoading.hide();

            var tempData = {
                "status": true,
                "status_code": 200,
                "status_message": "Success",
                "data":
                {
                    "id": "855",
                    "date": "2016-02-03",
                    "message": "",
                    "status": "enabled",
                    "items": [
                        { "schedule_id": "855", "start": "10:00:00", "title": "Музика ", "category": "Switchfoot" },
                        { "schedule_id": "855", "start": "10:30:00", "title": "Мъченици за Христос", "category": "Документален филм" },
                        { "schedule_id": "855", "start": "11:00:00", "title": "Маховик", "category": "Игрален филм" },
                        { "schedule_id": "855", "start": "13:00:00", "title": "Сделката е все още в сила", "category": "Джак Хейфорд" },
                        { "schedule_id": "855", "start": "14:00:00", "title": "Псалм 103:8", "category": "Джойс Майер" },
                        { "schedule_id": "855", "start": "14:30:00", "title": "Хваление", "category": "Църква на вяра" },
                        { "schedule_id": "855", "start": "15:00:00", "title": "Твоите решения имат последствия", "category": "Данаил Танев" },
                        { "schedule_id": "855", "start": "16:00:00", "title": "Музика ", "category": "Sanctus Real" },
                        { "schedule_id": "855", "start": "16:30:00", "title": "Матей 11:30", "category": "Джойс Майер" },
                        { "schedule_id": "855", "start": "17:00:00", "title": "Хваление", "category": "Църква на вяра " },
                        { "schedule_id": "855", "start": "17:30:00", "title": "Мирото на Святия Дух", "category": "Ден на победа" },
                        { "schedule_id": "855", "start": "18:00:00", "title": "Бог, който надминава нуждите", "category": "Джентезен Франклин" },
                        { "schedule_id": "855", "start": "18:30:00", "title": "Благовестието е Божията сила за спасение", "category": "Даниел Коленда" },
                        { "schedule_id": "855", "start": "19:00:00", "title": "Ще бягаш без да се умориш", "category": "Глория Копланд" },
                        { "schedule_id": "855", "start": "19:30:00", "title": "Опознай Святия Дух", "category": "Джон Бивиър" },
                        { "schedule_id": "855", "start": "20:00:00", "title": "Душа на сърфист", "category": "игрален филм" },
                        { "schedule_id": "855", "start": "22:00:00", "title": "Матей 12:1", "category": "Джойс Майер" },
                        { "schedule_id": "855", "start": "22:30:00", "title": "Книгата на твоя живот", "category": "Маттс-Ола Исхоел" },
                        { "schedule_id": "855", "start": "23:30:00", "title": "Музика ", "category": "Soulfire Revolution" }
                    ]
                }
            };

            $scope.data = tempData;
        });
    };

    $scope.doRefresh = function () {

        $scope.getSchedule();
        $scope.data = $scope.data;
        $scope.$broadcast('scroll.refreshComplete');
    };
})
