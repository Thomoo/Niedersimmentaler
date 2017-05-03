'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Wettkampf = new Module('wettkampf');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Wettkampf.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  Wettkampf.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Wettkampf.menus.add({
    title: 'Wettkampf',
    link: 'wettkampf',
    roles: ['admin'],
    menu: 'admin'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Wettkampf.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Wettkampf.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Wettkampf.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Wettkampf;
});
