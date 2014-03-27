(function() {
    "use strict";
    
    document.addEventListener('deviceready', function() {
        if (navigator.connection.type === Connection.NONE) {
            DevExpress.ui.dialog.alert("Uključite Internet konekciju", Deje.ALERT_TITLE).done(function() {
                window.plugins.webintent.startActivity({ action: 'android.settings.DATA_ROAMING_SETTINGS' });
            });
        }
    });

    var Deje = window.Deje = {
        ALERT_TITLE: "Deje",
        Services: {
            Gps: {
                getPosition: function() {
                    var d = new $.Deferred();
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(pos) {
                            d.resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
                        },
                        function() {
                            d.reject();
                        }, {timeout: 10000});
                    }
                    //d.resolve({ latitude: 45.25, longitude: 19.85 });
                    return d;
                }
            }
        }
    };
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    DevExpress.devices.current({ platform: "android" });

    $(function () {
        
        Deje.app = new DevExpress.framework.html.HtmlApplication({
            namespace: Deje,
            
            navigationType: "slideout",
            navigation: [
              {
                title: "Pretraga",
                action: "#home",
                icon: "find"
              }
            ]
        });
        
        Deje.app.router.register(":view", { view: "home" });
        Deje.app.navigate();
    });
    
})();