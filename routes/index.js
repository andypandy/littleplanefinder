
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
  res.render('partials/' + name);
};