'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Teilnehmer = new Module('teilnehmer');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Teilnehmer.register(function(app, auth, database, circles) {

  Teilnehmer.angularDependencies(['ngMessages']);

  //We enable routing. By default the Package Object is passed to the routes
  Teilnehmer.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Teilnehmer.menus.add({
    title: 'Anmeldung',
    link: 'anmeldung',
    roles: ['authenticated', 'anonymous'],
    menu: 'main'
  });

  Teilnehmer.menus.add({
    title: 'Teilnehmerverwaltung',
    link: 'teilnehmerverwaltung',
    roles: ['authenticated'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Teilnehmer.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Teilnehmer.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Teilnehmer.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Teilnehmer;
});
