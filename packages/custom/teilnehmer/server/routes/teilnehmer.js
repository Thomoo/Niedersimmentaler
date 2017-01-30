(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Teilnehmer, app, auth, database, circles) {

    var requiresLogin = circles.controller.hasCircle('authenticated');

    var teilnehmer = require('../controllers/teilnehmer');

    app.route('/api/teilnehmer')
      .get(teilnehmer.all)
      .post(teilnehmer.create);

    app.route('/api/teilnehmer/:teilnehmerId')
      .get(teilnehmer.show)
      .post(requiresLogin, teilnehmer.updateWithStartNr)
      .put(teilnehmer.update)
      .delete(requiresLogin, teilnehmer.destroy);

    // Finish with setting up the teilnehmerId param
    app.param('teilnehmerId', teilnehmer.teilnehmer);

  };
})();
