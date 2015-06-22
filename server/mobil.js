

Meteor.startup(function () {
  if (Meteor.isCordova) {
    if (AdMob) {
      AdMob.createBanner( {
        adId: 'ca-app-pub-3080070244198226/2109901818',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        isTesting: true,
        autoShow: true,
        success: function() {
          console.log("Received ad");
        },
        error: function() {
          console.log("No ad received");
        }
      });
    } else {
      console.log("No Admob");
    }
  } else {
    console.log("No Cordova ");
  }
}