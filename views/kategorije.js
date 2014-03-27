Deje.kategorije = function(params) {

    return {
        kategorije: new DevExpress.data.DataSource({
            load: function(opts) {
                var d = new $.Deferred();
                Deje.Services.Gps.getPosition()
                    .done(function (pos) {
                        $.get('http://deje2.azurewebsites.net/Home/Pronadji', {
                            latituda: pos.latitude,
                            longituda: pos.longitude,
                            udaljenost: params.udaljenost,
                            delatnost: params.delatnost,
                            skip: opts.skip,
                            take: opts.take
                        }, function (rezultati) {
                            d.resolve(rezultati.grupeArtikala);
                        });
                    });
                return d.promise();
            }
        }),
        pretraziKategoriju: function(item) {
            var id = item.model.id;
            if (id) {
                Deje.app.navigate({
                    view: 'artikli',
                    idGrupe: id,
                    udaljenost: params.udaljenost
                });
            }
        }
    };
};