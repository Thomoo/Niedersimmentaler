(function() {
    'use strict';

    // Wettkampf authorization helpers
    var hasAuthorization = function(req, res, next) {
      if (!req.user.isAdmin()) {
        return res.send(401, 'User is not authorized');
      }
      next();
    };

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Wettkampf, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var wettkampf = require('../controllers/wettkampf');

        app.route('/api/wettkampf')
          .post(hasAuthorization, wettkampf.create)
          .get(wettkampf.get);
    };
})();
