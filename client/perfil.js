Template.perfil.helpers({
	puntos: function (user) {
		var puntos = user.profile.puntos;
		console.log(puntos);
		return puntos;
	},
	nombre: function (user) {
		// var user= Meteor.user();
	      console.log(user);
	      if (user.services)
	      {
	          if (user.services.facebook){
	              return user.services.facebook.name;
	            }else 
	          if (user.services.twitter){
	              return user.services.twitter.profile.name;
	            }
	      }
	      else
	      {
	          return "Goku";
	      }
	},
	puntajeMaximo: function (user) {
		var juegos = Juegos.find({user:user._id}).fetch();
		console.log('juegos: '+juegos.length);
		var puntos=0;
		juegos.forEach(function (juego) {
			if (juego.puntos>puntos) {
				puntos = juego.puntos;
			};
		});
		if (puntos!=0) {
			Meteor.call('setPuntaje',user,puntos);
		};
		return puntos;
	}
});