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
            $translate.instant('December'),
            $translate.instant('ContactForm'),
            $translate.instant('OtherContacts'),
            $translate.instant('Send'),
            $translate.instant('Internet'),
            $translate.instant('Phone'),
            $translate.instant('Adress'),
            $translate.instant('News'),
            $translate.instant('Videos'),
            $translate.instant('Support'),
            $translate.instant('Donation'),
            $translate.instant('More'),
            $translate.instant('Contacts'),
            $translate.instant('Related'),
            $translate.instant('AllInOne'),
            $translate.instant('Qualities'),
            $translate.instant('LowQuality'),
            $translate.instant('HighQuality'),
            $translate.instant('SdAvailable'),
            $translate.instant('HdAvailable'),
            $translate.instant('FullVersion'),
            $translate.instant('AdressDetails'),
            $translate.instant('Other1'),
            $translate.instant('Other2'),
            $translate.instant('Company'),
            $translate.instant('Street'),
            $translate.instant('City'),
            $translate.instant('DonationIntro'),
            $translate.instant('DonationTitle'),
            $translate.instant('PayPal'),
            $translate.instant('BankTransfer'),
            $translate.instant('PayPalTxt'),
            $translate.instant('BankTransferTxt'),
            $translate.instant('BGN'),
            $translate.instant('EUR'),
            $translate.instant('USD'),
            $translate.instant('DSK'),
            $translate.instant('FIBANK'),
            $translate.instant('EUROBANK'),






































        ];

        return date.getDate() + " " + months[date.getMonth()];
    };

});
