Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.layout('layout');
    this.render('login');
  } else {
    this.next();
  }
});

Router.onBeforeAction(function() {
  var juego = Juegos.findOne({_id:this.params._id});
  if (!juego.activo || juego.user!=Meteor.userId()) {
    this.layout('layout')
    this.render('juegos');
    console.log('no puedes jugar');
  }else{
    console.log('a jugar');
    this.next();
  }
}, {
  only: ['juego']
});


Router.route('/', function () {
  this.layout('layout');
  this.render('juegos', {
    data: function () { return ""}
  });
});
Router.route('/login', function () {
  this.layout('layout');
  this.render('login', {
    data: function () { return ""}
  });
});
Router.route('/juegos', function () {
  this.layout('layout');
  this.render('juegos', {
    data: function () { return ""}
  });
});
Router.route('/juego/:_id', function () {
  this.layout('layout');
  this.render('juego', {
    data: function () { return Juegos.findOne({_id:this.params._id});}
  });
},{name:'juego'});

Router.route('/perfil', function () {
  this.layout('layout');
  this.render('perfil');
});

Router.route('/borrar', function () {
  this.layout('layout');
  this.render('borrar');
});

Router.route('/hello',function () {
  this.layout('layout');
  this.render('hello');
})

