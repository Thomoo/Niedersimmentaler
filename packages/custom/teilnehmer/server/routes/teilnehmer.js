(function () {
  'use strict';

  // Teilnehmer authorization helpers
  var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin()) {
      return res.send(401, 'User is not authorized');
    }
    next();
  };

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Teilnehmer, app, auth, database, circles) {

    var requiresLogin = circles.controller.hasCircle('authenticated');

    var teilnehmer = require('../controllers/teilnehmer');

    app.route('/api/teilnehmer')
      .get(teilnehmer.all)
      .post(teilnehmer.create);

    app.route('/api/teilnehmer/:teilnehmerId')
      .get(auth.isMongoId, teilnehmer.show)
      .post(auth.isMongoId, requiresLogin, teilnehmer.updateWithStartNr)
      .put(auth.isMongoId, teilnehmer.update)
      .delete(auth.isMongoId, requiresLogin, hasAuthorization, teilnehmer.destroy);

    // Finish with setting up the teilnehmerId param
    app.param('teilnehmerId', teilnehmer.teilnehmer);

  };
})();
