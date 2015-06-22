Template.juego.helpers({
	actual: function () {
		console.log(this);
		return this.imagenes[this.posicion];
	}
});

Template.juego.events({
	'click #seleccion': function (event,template) {
		var correcta = template.data.imagenes[template.data.posicion].nombre;
		if (correcta!=undefined) {
		var seleccionada = this.valueOf();
		if (seleccionada==correcta) {
			console.log('Ok');
			Juegos.update({_id:template.data._id}, {$set:{
				posicion:template.data.posicion+1,
				puntos:template.data.puntos+1
			}});
			Meteor.call('sumarPunto',Meteor.userId());
			Materialize.toast('¡Bien!', 1000);
		}else{
			Juegos.update({_id:template.data._id}, {$set:{
				activo:false
			}});
			Router.go('/juegos')
			Materialize.toast('¡Perdiste!', 3000);
		};
		console.log(seleccionada);
	}else{
		Router.go('/juegos');
	}
	}
});