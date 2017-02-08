(function () {
  'use strict';

  function Teilnehmer($stateProvider) {

    $stateProvider.state('anmeldung', {
      url: '/teilnehmer/subscription',
      templateUrl: 'teilnehmer/views/subscription.html'
    }).state('confirm subscription', {
      url: '/teilnehmer/subscription/confirmation',
      templateUrl: 'teilnehmer/views/subscription-confirmation.html'
    }).state('edit subscription by id', {
      url: '/teilnehmer/subscription/:teilnehmerId',
      templateUrl: 'teilnehmer/views/edit-subscription.html'
    }).state('teilnehmerverwaltung', {
      url: '/teilnehmer/administration',
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
