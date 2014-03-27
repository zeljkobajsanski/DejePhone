Deje.home = function (params) {

    var udaljenost = ko.observable(1000),
        pojam = ko.observable(),
        DX = DevExpress,
        busy = ko.observable(false);

    function pretraziPoPojmu() {
        Deje.app.navigate({ view: 'artikli', udaljenost: udaljenost(), pojam: pojam() });
    }

    function pretraziPoKategoriji() {
        Deje.app.navigate({ view: 'kategorije', udaljenost: udaljenost(), delatnost: 1 });
    }

    var viewModel = {
        udaljenost: udaljenost,
        udaljenostM: ko.computed(function() {
            return udaljenost() + ' m';
        }),
        pojam: pojam,
        pretrazi: function () {
            busy(true);
            Deje.Services.Gps.getPosition()
                             .done(function() {
                                 if (pojam()) {
                                     pretraziPoPojmu();
                                 } else {
                                     pretraziPoKategoriji();
                                 }
                             })
                             .fail(function() {
                                 DX.ui.dialog.alert('Potrebno je aktivirati GPS senzor na vašem uređaju', Deje.ALERT_TITLE).done(function() {
                                     window.plugins.webintent.startActivity({ action: 'android.settings.LOCATION_SOURCE_SETTINGS' });
                                 });
                             }).always(function() {
                                 busy(false);
                             });
        },
        ponisti: function() {
            udaljenost(1000);
            pojam('');
        },
        loadPanelVisible: busy
    };

    return viewModel;
};