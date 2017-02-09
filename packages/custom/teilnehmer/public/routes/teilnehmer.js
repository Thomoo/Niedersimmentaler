(function () {
  'use strict';

  function Teilnehmer($stateProvider) {

    $stateProvider.state('anmeldung', {
      url: '/teilnehmer/anmeldung',
      templateUrl: 'teilnehmer/views/anmeldung.html'
    }).state('confirm subscription', {
      url: '/teilnehmer/anmeldung/bestaetigung',
      templateUrl: 'teilnehmer/views/anmeldung-bestaetigung.html'
    }).state('edit subscription by id', {
      url: '/teilnehmer/anmeldung/:teilnehmerId',
      templateUrl: 'teilnehmer/views/edit-anmeldung.html'
    }).state('teilnehmerverwaltung', {
      url: '/teilnehmer/verwaltung',
      templateUrl: 'teilnehmer/views/verwaltung.html'
      // resolve: {
      //   loggedin: isCompetitorAdmin
      // }
    }).state('edit teilnehmer by id', {
      url: '/teilnehmer/:teilnehmerId',
      templateUrl: 'teilnehmer/views/edit-teilnehmer.html'
      // resolve: {
      //   loggedin: isCompetitorAdmin
      // }
    });
  }

  angular
    .module('mean.teilnehmer')
    .config(Teilnehmer);

  Teilnehmer.$inject = ['$stateProvider'];

})();
