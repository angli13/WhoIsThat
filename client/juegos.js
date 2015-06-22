Template.juegos.helpers({
	juegos: function () {
		return Juegos.find({user:Meteor.userId()});
	}
});

Template.juegos.events({
	'click #nuevoJuego': function () {
		var juego;
		Meteor.call('crearJuego',Meteor.userId(),function(error, result){
		  juego = result;
		  console.log(juego);

		  Router.go('/juego/'+juego);
		});

	}
});

Template.juegoItem.events({
	'click ': function () {
		Router.go('/juego/'+this._id);
	}
});

Template.juegoItem.helpers({

	puntaje: function (juego) {
		return juego.puntos + " puntos";
	},
	porcentaje: function (juego) {
		return 100/(juego.imagenes.length /juego.posicion);
	},

	});