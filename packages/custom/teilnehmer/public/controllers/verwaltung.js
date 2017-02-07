(function () {
  'use strict';


  function VerwaltungsController($scope, $location, $filter, $log, Global, Teilnehmer) {
    $scope.global = Global;
    $scope.package = {
      name: 'teilnehmer'
    };

    $scope.find = function () {
      $log.info('find called...');
      Teilnehmer.query(function (teilnehmende) {
        $scope.teilnehmende = teilnehmende;
      });
    };

    // daten aufbereiten
    $scope.genders = [{
      value: 'male',
      text: 'männlich'
    }, {
      value: 'female',
      text: 'weiblich'
    }];

    $scope.showGender = function (teilnehmer) {
      var selected = [];
      if (teilnehmer.gender) {
        selected = $filter('filter')($scope.genders, {
          value: teilnehmer.gender
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.navigateToDetails = function (teilnehmer) {
      $location.path('/teilnehmer/' + teilnehmer._id);
    };

    $scope.resetSearchForm = function () {
      $scope.global.search = {};
    };

    $scope.searchFormEmpty = function () {
      return (!$scope.global.search || (!$scope.global.search.startnr && !$scope.global.search.birthdate && !$scope.global.search.$));
    };

    $scope.generateStartNr = function (teilnehmer) {
      if (!teilnehmer.startnr) {
        teilnehmer.$toggleStartNr();
      }
    };

    $scope.removeStartNr = function (teilnehmer) {
      var msg = 'Willst du die Startnummer von ' + teilnehmer.firstname + ' ' + teilnehmer.name + ' wirklich entfernen? \n\nDies darf nur gemacht werden, wenn der Teilnehmer die Nummer noch nicht abgeholt hat!';
      if (confirm(msg) && teilnehmer.startnr) {
        teilnehmer.$toggleStartNr();
      }
    };
  }

  angular
    .module('mean.teilnehmer')
    .controller('VerwaltungController', VerwaltungsController);

  VerwaltungsController.$inject = ['$scope', '$location', '$filter', '$log', 'Global', 'Teilnehmer'];
})();

