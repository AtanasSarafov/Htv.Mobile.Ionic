angular.module('App').service('displayUtils', function ($translate) {

    this.getDisplayDate = function (dateString) {
        var date = new Date(dateString);
        var months = [
            $translate.instant('January'),
            $translate.instant('February'),
            $translate.instant('March'),
            $translate.instant('April'),
            $translate.instant('May'),
            $translate.instant('June'),
            $translate.instant('July'),
            $translate.instant('August'),
            $translate.instant('September'),
            $translate.instant('October'),
            $translate.instant('November'),
            $translate.instant('December')
        ];

        return date.getDate() + " " + months[date.getMonth()];
    };

});