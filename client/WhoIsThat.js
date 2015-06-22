Imagenes = new Mongo.Collection("imagenes");
Nombres = new Mongo.Collection("nombres");
Juegos = new Mongo.Collection("juegos");


  // counter starts at 0
  Session.setDefault('actual', 0);
  Session.setDefault('loading', false);

  Meteor.startup(function () {
    T9n.setLanguage('es');
  });

  UI.registerHelper("getImageUser", function (userId) {
      var user= Meteor.users.findOne(userId);
      console.log(user);
      if (user.services)
      {
          if (user.services.facebook){
              return user.services.facebook.picture;
            }else 
          if (user.services.twitter){
              return user.services.twitter.profile_image_url;
            }else
          if (user.services.google){
              return user.services.google.picture;
            }
      }
      else
      {
          return "images/withOutPhoto.png";
      }
  });

  Template.layout.helpers({
    loading: function () {
      return Session.get('loading');
    }
  });

  Template.layout.events({
    'click #salir': function () {
      Meteor.logout(function(err) {
        console.log('logged out');
      });
    }
  });

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    imagenes: function() {
      return Imagenes.find({});
    },
    nombres: function() {
      return Nombres.find({});
    },
    nombreDeImagen: function(url) {
      var n = Nombres.findOne({url:url});
      if (n==undefined) {
        return "";
      }else{
        return n.nombre;
      };
    }
  });

  Template.layout.rendered = function () {
    this.$(".button-collapse").sideNav();
  };

  Template.hello.events({
    'click #imagenes': function () {
      // increment the counter when button is clicked
      console.log(Meteor.call('actualizarImagenes'));
      Session.set('counter', Session.get('counter') + 1);
    },
    'click #nombres': function () {
      // increment the counter when button is clicked
      console.log(Meteor.call('actualizarNombres'));
      Session.set('counter', Session.get('counter') + 1);
    },
    'click #combinar': function () {
      // increment the counter when button is clicked
      console.log(Meteor.call('asignarNombres'));
      Session.set('counter', Session.get('counter') + 1);
    }
  });
