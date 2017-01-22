(function() {
    'use strict';

    // Disziplin authorization helpers
    var hasAuthorization = function(req, res, next) {
      if (!req.user.isAdmin()) {
        return res.send(401, 'User is not authorized');
      }
      next();
    };

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Disziplin, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var disziplins = require('../controllers/disziplin');


        app.route('/api/disziplins')
          .post(hasAuthorization, disziplins.create)
          .get(disziplins.all);

        app.route('/api/disziplins/:disziplinId')
          .put(auth.isMongoId, requiresLogin, hasAuthorization, disziplins.update)
          .delete (auth.isMongoId, requiresLogin, hasAuthorization, disziplins.destroy);

        // Finish with setting up the disziplinId param
        app.param('disziplinId', disziplins.disziplin);
    };
})();
