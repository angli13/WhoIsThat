Template.borrar.events({
	'click #borrar-usuarios': function () {
		console.log(Meteor.userId());
		Meteor.call('removeUser',Meteor.userId());
	}
});