Deje.dobavljac = function(params) {

    var icon = ko.observable('food'),
        ponuda = ko.observableArray([]),
        telefon = null;

    $.get('http://deje2.azurewebsites.net/Home/VratiDobavljaca', { id: params.id }, function (dobavljac) {
        telefon = dobavljac.Telefon;
        var p = dobavljac.Ponuda.map(function (item) {
            return {
                key: item.Kategorija,
                items: item.Artikli
            };
        });
        ponuda(p);
    });

    var vModel = {
        icon: icon,
        promeniPrikaz: function() {
            if (icon() === 'food') {
                icon('info');
            } else {
                icon('food');
            }
        },
        ponuda: ponuda,
        pozovi: function() {
            if (telefon) {
                phonedialer.dial(telefon);
            } else {
                DevExpress.ui.dialog.alert("Broj telefona nije unet", Deje.ALERT_TITLE);
            }
        }
    };

    return vModel;
}