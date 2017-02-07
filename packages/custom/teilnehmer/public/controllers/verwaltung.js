(function () {
  'use strict';


  function VerwaltungsController($scope, $location, $filter, $log, Global, Teilnehmer) {
    $scope.global = Global;
    $scope.package = {
      name: 'teilnehmer'
    };

    $scope.find = function () {
      $log.info('find called...');
      Teilnehmer.query(function (competitors) {
        $scope.competitors = competitors;
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

    $scope.showGender = function (competitor) {
      var selected = [];
      if (competitor.gender) {
        selected = $filter('filter')($scope.genders, {
          value: competitor.gender
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.navigateToDetails = function (competitor) {
      $location.path('/teilnehmer/' + competitor._id);
    };

    $scope.resetSearchForm = function () {
      $scope.global.search = {};
    };

    $scope.searchFormEmpty = function () {
      return (!$scope.global.search || (!$scope.global.search.startnr && !$scope.global.search.birthdate && !$scope.global.search.$));
    };

    $scope.generateStartNr = function (competitor) {
      if (!competitor.startnr) {
        competitor.$toggleStartNr();
      }
    };

    $scope.removeStartNr = function (competitor) {
      var msg = 'Willst du die Startnummer von ' + competitor.firstname + ' ' + competitor.name + ' wirklich entfernen? \n\nDies darf nur gemacht werden, wenn der Teilnehmer die Nummer noch nicht abgeholt hat!';
      if (confirm(msg) && competitor.startnr) {
        competitor.$toggleStartNr();
      }
    };
  }

  angular
    .module('mean.teilnehmer')
    .controller('VerwaltungController', VerwaltungsController);

  VerwaltungsController.$inject = ['$scope', '$location', '$filter', '$log', 'Global', 'Teilnehmer'];
})();

