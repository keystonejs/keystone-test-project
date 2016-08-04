var keystone = require('keystone');
var config = require('./config');
var evh = require('express-vhost');
var url = require('url');
var proxy = require('proxy-middleware');

/**
 * This is an example of how to use the advanced API to start Keystone,
 * allowing you to mount the keystone admin UI on many subdomains
 *
 * For the example to run you must make the host resolve to 127.0.0.1
 * the names www.localhost.com, subdomain.localhost.com and git.localhost.com
 * 
 * NOTE: The git.localhost.com is an example to proxy to a gitlab instance
 */

keystone.init(config.options);
keystone.import('models');
keystone.set('locals', config.locals);
keystone.set('nav', config.nav);

var server = keystone.express();
keystone.initExpressApp(server);
keystone.openDatabaseConnection();

server.use(evh.vhost(server.enabled('trust proxy')));

// Mount www.localhost.com routes
var www = keystone.express.Router();
keystone.initRouter(www, require('./routes/www'));
evh.register('www.localhost.com', www);

// Mount subdomain.localhost.com routes
var subdomain = keystone.express.Router();
keystone.initRouter(subdomain, require('./routes/subdomain'));
evh.register('subdomain.localhost.com', subdomain);

// Mount git.localhost.com to serve gitlab
var gitOptions = url.parse('http://127.0.0.1:8081/');
gitOptions.preserveHost = true;
evh.register('git.localhost.com', proxy(gitOptions));

server.listen(process.env.PORT || 3001, function() {
  console.log('-------------------------------');
  console.log('Express server ready on port %d', this.address().port);
  console.log('-------------------------------');
});
