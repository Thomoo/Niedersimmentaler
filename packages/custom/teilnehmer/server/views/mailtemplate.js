'use strict';

module.exports = {
  confirmation_email: function(req, teilnehmer, mailOptions) {
    mailOptions.text = [
      'Hallo ' + teilnehmer.firstname + ' ' + teilnehmer.name + ',',
      'Vielen Dank für Deine Anmeldung.',
      'Du kannst Deine Angaben bis zum Anmeldeschluss unter folgendem Link einsehen und allenfalls korrigieren:',
      'http://' + req.headers.host + '/#!/teilnehmer/anmeldung/' + teilnehmer._id,
      'Nach dem Wettkampf kannst Du unter diesem Link auch Deine Resultate einsehen.'
    ].join('\n\n');
    mailOptions.subject = 'Anmeldebestätigung';
    return mailOptions;
  }
};
