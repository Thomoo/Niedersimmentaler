'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Disziplin = new Module('disziplin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Disziplin.register(function(app, auth, database, circles) {

  Disziplin.angularDependencies(['xeditable']);

  //We enable routing. By default the Package Object is passed to the routes
  Disziplin.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Disziplin.menus.add({
    title: 'Disziplinen',
    link: 'disziplin',
    roles: ['admin'],
    menu: 'admin'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Disziplin.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Disziplin.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Disziplin.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Disziplin;
});
