Deje.artikli = function(params) {

    return {
        artikli: new DevExpress.data.DataSource({
            load: function(opts) {
                var d = new $.Deferred();
                Deje.Services.Gps.getPosition()
                    .done(function (pos) {
                        var data = { razdaljina: params.udaljenost, latituda: pos.latitude, longituda: pos.longitude, skip: opts.skip, take: opts.take };
                        if (params.idGrupe) {
                            data.idGrupeArtikala = params.idGrupe;
                            $.get('http://deje2.azurewebsites.net/Home/PretraziArtikle', data, function (rezultati) {
                                d.resolve(rezultati);
                            });
                        }
                        if (params.pojam) {
                            data.naziv = params.pojam;
                            $.get('http://deje2.azurewebsites.net/Home/PretraziArtiklePoNazivu', data, function (rezultati) {
                                d.resolve(rezultati);
                            });
                        }
                    })
                    .fail(function() {

                    });

                return d.promise();
            }
        }),
        izabranArtikal: function (item) {
            if (item.model.Id && item.model.Tip) {
                Deje.app.navigate({ view: 'dobavljaci', udaljenost: params.udaljenost, idArtikla: item.model.Id, tip: item.model.Tip });
            }
        }
    };
}