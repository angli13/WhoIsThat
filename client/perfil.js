Template.perfil.helpers({
	puntos: function (userId) {

		
		var puntos = Meteor.user().profile.puntos;
		console.log(puntos);
		return puntos;
	},
	nombre: function () {
		var user= Meteor.user();
	      console.log(user);
	      if (user.services)
	      {
	          if (user.services.facebook){
	              return user.services.facebook.name;
	            }else 
	          if (user.services.twitter){
	              return user.services.twitter.name;
	            }
	      }
	      else
	      {
	          return "Goku";
	      }
	},
	puntajeMaximo: function (userId) {
		var juegos = Juegos.find({user:Meteor.userId()}).fetch();
		console.log('juegos: '+juegos.length);
		var puntos=0;
		juegos.forEach(function (juego) {
			if (juego.puntos>puntos) {
				puntos = juego.puntos;
			};
		});
		return puntos;
	}
});