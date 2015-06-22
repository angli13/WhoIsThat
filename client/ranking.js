Template.rankingTemplate.helpers({
  jugadores : function  () {
  	return Session.get('jugadores');
  }
});

Template.rankingTemplate.rendered = function () {
	Meteor.call('getRank',function (err,ok) {
          console.log(ok);
          Session.set('jugadores',ok);
        });
};