'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Teilnehmer = mongoose.model('Teilnehmer'),
    _ = require('lodash'),
    async = require('async'),
    config = require('meanio').getConfig(),
    nodemailer = require('nodemailer'),
    mailTemplates = require('../views/mailtemplate');

/**
 * Send confirmation email
 */
function sendMail(mailOptions) {
  var transport = nodemailer.createTransport('SMTP', config.mailer);
  console.info('sendMail...: ' + JSON.stringify(mailOptions));
  transport.sendMail(mailOptions, function (err, response) {
    if (err) {
      console.info('error sending email...:' + err);
      return err;
    }
    return response;
  });
}

/**
 * Callback for forgot password link
 */
var sendConfirmationMail = function (req, teilnehmer) {
  async.waterfall([

    function () {
      var mailOptions = {
        to: teilnehmer.email,
        from: config.emailFrom
      };
      mailOptions = mailTemplates.confirmation_email(req, teilnehmer, mailOptions);
      return sendMail(mailOptions);
    }], function (err) {
    console.log('error: ' + err);
    var response = {
      message: 'Mail successfully sent',
      status: 'success'
    };
    if (err) {
      response.message = 'Sending Mail failed';
      response.status = 'danger';
    }
  });
};

/**
 * Find teilnehmer by id
 */
exports.teilnehmer = function (req, res, next, id) {
  Teilnehmer.load(id, function (err, teilnehmer) {
    if (err)
      return next(err);
    if (!teilnehmer)
      return next(new Error('Failed to load teilnehmer ' + id));
    req.teilnehmer = teilnehmer;
    next();
  });
};

/**
 * Create a teilnehmer
 */
exports.create = function (req, res) {
  var teilnehmer = new Teilnehmer(req.body);

  teilnehmer.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the teilnehmer'
      });
    }
    console.log(JSON.stringify(sendConfirmationMail(req, teilnehmer)));
    res.json(teilnehmer);

  });
};


function saveTeilnehmer(res, teilnehmer) {
  return teilnehmer.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the teilnehmer'
      });
    }

  });
}


exports.updateWithStartNr = function (req, res) {

  console.info('updateWithStartNr');

  var teilnehmer = req.teilnehmer;

  teilnehmer = _.extend(teilnehmer, req.body);

  if (teilnehmer.startnr) {
    // startnr already exists, remove it
    teilnehmer.startnr = undefined;
    saveTeilnehmer(res, teilnehmer);

    res.json(teilnehmer);

    return;
  }

  Teilnehmer.findOne().sort('-startnr').exec(function (err, highestTeilnehmer) {
    if (err) {
      console.log('err: ' + err);
      return res.status(500).json({
        error: 'Cannot generate a new startnr'
      });
    }

    teilnehmer.startnr = highestTeilnehmer.startnr ? highestTeilnehmer.startnr + 1 : 1;

    teilnehmer = _.extend(teilnehmer, req.body);

    saveTeilnehmer(res, teilnehmer);

    res.json(teilnehmer);
  });
};

/**
 * Update a teilnehmer
 */
exports.update = function (req, res) {
  var teilnehmer = req.teilnehmer;

  teilnehmer = _.extend(teilnehmer, req.body);

  teilnehmer.save(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the teilnehmer'
      });
    }
    res.json(teilnehmer);

  });
};

/**
 * Delete a teilnehmer
 */
exports.destroy = function (req, res) {
  console.info('deleting user');
  var teilnehmer = req.teilnehmer;

  teilnehmer.remove(function (err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the teilnehmer' + err
      });
    }
    res.json(teilnehmer);

  });
};

/**
 * Show a teilnehmer
 */
exports.show = function (req, res) {
  res.json(req.teilnehmer);
};

/**
 * List of Teilnehmer
 */
exports.all = function (req, res) {
  Teilnehmer.find().sort('-created').exec(function (err, teilnehmer) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the teilnehmer' + err
      });
    }
    res.json(teilnehmer);

  });
};
