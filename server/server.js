Imagenes = new Mongo.Collection("imagenes");
Nombres = new Mongo.Collection("nombres");
Juegos = new Mongo.Collection("juegos");

Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
  actualizarImagenes: function (arg1, arg2) {
      // var request = require("request");
      console.log('calling Api');
      var request = Meteor.npmRequire("request");

      this.unblock();
      request("https://www.kimonolabs.com/api/4fihfqhi?apikey=0YlE5I20crvtwhzqBopRrATKtJWobVzf", 
      Meteor.bindEnvironment(function(err, response, body) {
        var obj = JSON.parse(body);
        var imagenes = obj.results.Imagen;
        for (var i = imagenes.length - 1; i >= 0; i--) {
          console.log(imagenes[i].imagen.src);
          console.log(imagenes[i].url);
          Imagenes.upsert({url:imagenes[i].url},{src:imagenes[i].imagen.src,url:imagenes[i].url});
        };
        
        return body;
      }));
    },
  actualizarNombres: function () {
      // var request = require("request");
      console.log('calling Api');
      var request = Meteor.npmRequire("request");

      this.unblock();
      request("https://www.kimonolabs.com/api/1zcm116m?apikey=0YlE5I20crvtwhzqBopRrATKtJWobVzf", 
      Meteor.bindEnvironment(function(err, response, body) {
        var obj = JSON.parse(body);
        var nombres = obj.results.DragonBall;
        for (var i = nombres.length - 1; i >= 0; i--) {
          console.log(nombres[i].nombre.text);
          Nombres.upsert({url:nombres[i].nombre.href},{nombre:nombres[i].nombre.text,url:nombres[i].nombre.href});
        };
        return body;
      }));
    },
  asignarNombres: function () {
      var imagenes = Imagenes.find({}).fetch();
      for (var i = imagenes.length - 1; i >= 0; i--) {
        console.log('Imagen_'+imagenes[i].url)
        var url = imagenes[i].url;
        var nombre = Nombres.findOne({url:url});
        if (nombre!=undefined) {
          Imagenes.update({_id:imagenes[i]._id}, {nombre:nombre.nombre,tieneNombre:true,url:url,src:imagenes[i].src});
          console.log(url+": "+nombre.nombre);
        };
      };
    },
    crearJuego: function (userId) {
      var imagenes = Imagenes.find({}).fetch();
      var nombres = Nombres.find({}).fetch();
      console.log(userId);
      function shuffleArray(array) {
          for (var i = array.length - 1; i >= 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
              var respuestas = [];
              var n1 = Math.floor(Math.random() * nombres.length);
              var n2 = Math.floor(Math.random() * nombres.length);
              respuestas.push(nombres[n1].nombre);
              respuestas.push(nombres[n2].nombre);
              respuestas.push(array[i].nombre)
              for (var k = respuestas.length - 1; k > 0; k--) {
                  var l = Math.floor(Math.random() * (k + 1));
                  var temp = respuestas[k];
                  respuestas[k] = respuestas[l];
                  respuestas[l] = temp;
              }
              array[i].respuestas = respuestas;
              array[i].respondido = false;

          }
          return array;
      }
      var shuffled = shuffleArray(imagenes);
      var insertedId = Juegos.insert({
        imagenes:shuffled,
        user:userId,
        activo:true,
        puntos:0,
        posicion:0,
      });
      // console.log(Juegos.findOne({_id:insertedId}));
      return insertedId;
    },
    removeUser:function(userId) {
      Meteor.users.remove({_id:userId});
    },
    getRank:function() {
      var users = Meteor.users.find({},
        {
          fields : {profile:1},
          sort : {'profile.puntajeMax':-1},
          limit : 100
        }).fetch();
      console.log(users);
      for (var i = users.length - 1; i >= 0; i--) {
        users[i].index = i+1;
      };
      return users;
    },
    setPuntaje:function(user,puntos) {
      Meteor.users.update({_id:user._id}, {$set:{'profile.puntajeMax':puntos}});;
    },
    sumarPunto:function(userId) {
      var p = Meteor.users.findOne({_id:userId}).profile.puntos;
      Meteor.users.update({_id:userId}, {$set:{'profile.puntos':p+1}},function (err,ok) {
        console.log(err+",,,,,"+ok);
        var user = Meteor.users.findOne({_id:userId});
        console.log(user.profile.puntos);
      });
      
    }
  });

Houston.add_collection(Meteor.users);
Houston.add_collection(Houston._admins);
Accounts.onCreateUser(function(options, user) {
    if (typeof(user.services.facebook) != "undefined") {
        user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }
    if(!options.profile){
       options.profile = {}
    }
    options.profile.permission = 'default'
    if (options.profile){
        user.profile = options.profile;
        user.profile.puntos=0;
        user.profile.puntajeMax=0;
      }
    

    return user;
});