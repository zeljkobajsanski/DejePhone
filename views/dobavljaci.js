Deje.dobavljaci = function(params) {
    var markers = ko.observableArray([]),
        zoom = ko.observable(13),
        prikaz = ko.observable('globe'),
        myPosition = ko.observableArray([]),
        busy = ko.observable(false);

    Deje.Services.Gps.getPosition().done(function(pos) {
        myPosition.removeAll();
        myPosition.push(pos.latitude);
        myPosition.push(pos.longitude);
    });

    function prikaziDobavljaca(id) {
        Deje.app.navigate({ view: 'dobavljac', id: id });
    }
    
    return {
        mapKey: 'AoAspjo-51Af3fRuiPmgnwZ6969gydoWrZ26rmvfE9tk10e7Q5JYNvs4rXLQ8VKn',
        zoom: zoom,
        markers: markers,
        prikaz: prikaz,
        myPosition: myPosition,
        promeniPrikaz: function() {
            if (prikaz() === 'globe') {
                prikaz('menu');
            } else {
                prikaz('globe');
            }
        },
        dobavljaci: new DevExpress.data.DataSource({
            load: function (opts) {
                busy(true);
                var d = new $.Deferred;
                Deje.Services.Gps.getPosition().done(function(pos) {
                    var data = {
                        latitude: pos.latitude,
                        longitude: pos.longitude,
                        distance: params.udaljenost,
                        idArtikla: params.idArtikla,
                        tip: params.tip
                    };
                    $.get('http://deje2.azurewebsites.net/Home/PretraziDobavljace', data, function (results) {
                        var r = results.map(function(item) {
                            return {
                                location: item.Latitude + ', ' + item.Longitude,
                                tooltip: { text: item.Naziv, isShown: false },
                                clickAction: function () { prikaziDobavljaca(item.Id); },
                            };
                        });
                        r.push({
                            location: pos.latitude + ',' + pos.longitude,
                            iconSrc: 'img/profile.png'
                        });
                        markers(r);
                        busy(false);
                        d.resolve(results);
                    });
                });
                
                return d.promise();
            }
        }),
        prikaziDobavljaca: function(item) {
            if (item.model.Id) {
                prikaziDobavljaca(item.model.Id);
            }
        },
        loadPanelVisible: busy
    };
}