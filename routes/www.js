// Bind Routes
exports = module.exports = function(router) {

  router.get('/', function(req, res) {
  	res.render('www');
  });
};