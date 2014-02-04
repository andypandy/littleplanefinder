
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
  	user: req.user != undefined
  });
};

exports.partial = function (req, res) {
  var name = req.params.name;
  var requiresLogin = ['create', 'edit']; //Array of partial names that need login

  if(requiresLogin.indexOf(name) != -1 && req.isAuthenticated() == false) {
	  res.render('partials/notAllowed');
  } else {
	  res.render('partials/' + name, {
	  	user: req.user != undefined
	  });
  }
};