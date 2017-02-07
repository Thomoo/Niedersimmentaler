(function () {
  'use strict';

  /* jshint -W098 */

  function TeilnehmerController($scope, Global, Teilnehmer, $stateParams, $location, $log, Wettkampf, Disziplin) {
    $scope.global = Global;
    $scope.package = {
      name: 'teilnehmer'
    };

    $scope.teilnehmer = {
      gender: '',
      name: '',
      firstname: '',
      address: '',
      zip: '',
      location: '',
      society: '',
      email: '',
      birthdate: ''
    };

    $scope.getJahrgang = function(birthdate) {
      if (birthdate) {
        if (birthdate.length === 10) {
          return birthdate.substr(-4, 4);
        } else {
          return birthdate.substr(0, 4);
        }
      }
     };

    $scope.cancel = function(){
      $location.path('/teilnehmer/administration');
    };

    // $scope.subscriptionActive = $scope.global.isCompetitorAdmin;

    // $scope.hasAuthorization = function(teilnehmer) {
    //   $log.info('hasAuthorization in teilnehmer called...');
    //   return $scope.global.isCompetitorAdmin;
    // };

    $scope.create = function(isValid) {
      $log.info('create teilnehmer called...: ' + isValid);
      if (isValid) {
        var teilnehmerToCreate = new Teilnehmer({
          gender : this.teilnehmer.gender,
          name : this.teilnehmer.name,
          firstname : this.teilnehmer.firstname,
          address : this.teilnehmer.address,
          zip : '' + this.teilnehmer.zip,
          location : this.teilnehmer.location,
          society : this.teilnehmer.society,
          email : this.teilnehmer.email,
          birthdate : this.teilnehmer.birthdate,
          disciplines : $scope.selectDeclaredDisciplines($scope.allDisciplines)
        });
        teilnehmerToCreate.$save(function(response) {
          $location.path('/teilnehmer/subscription/confirmation');
        });
      } else {
        $scope.teilnehmer.submitted = true;
      }
    };

    $scope.loadDisciplins = function(cb) {
      $log.info('loadDisciplins called...');
      Disziplin.query(function(disciplines){

        // get the format function to show the result in that way
        disciplines.forEach(function(discipline){
          /* jshint ignore:start */
          var formatObj = JSON.parse(discipline.format);
          discipline.formatFnc = eval(formatObj.format);
          /* jshint ignore:end */
        });
        $scope.allDisciplines = disciplines;
        if (cb) {
          cb();
        }
      });
    };

    $scope.loadConfig = function(cb) {
      $log.info('loadConfig called...');
      Wettkampf.get({
      }, function(wettkampf) {
        $scope.wettkampf = wettkampf;
        if (wettkampf.anmeldungActive) {
          $scope.subscriptionActive = true;
        }
        if (cb) {
          cb();
        }
      });
    };

    $scope.loadConfigAndDisciplins = function() {
      $log.info('loadConfigAndDisciplins called...');
      $scope.loadConfig($scope.loadDisciplins);
    };

    $scope.loadDisciplinsAndFindOne = function() {
      $log.info('loadDisciplinsAndFindOne called...');
      $scope.loadDisciplins($scope.findOne);
    };

    $scope.loadConfigAndDisciplinsAndFindOne = function() {
      $log.info('loadConfigAndDisciplinsAndFindOne called...');
      $scope.loadConfig($scope.loadDisciplinsAndFindOne);
    };

    $scope.findOne = function() {
      $log.info('find teilnehmer called... with: ' + $stateParams.teilnehmerId);
      Teilnehmer.get({
        teilnehmerId : $stateParams.teilnehmerId
      }, function(teilnehmer) {
        $scope.teilnehmer = teilnehmer;
        teilnehmer.disciplines.forEach(function(dbDiscipline) {
          $scope.allDisciplines.forEach(function(discipline) {
            if (discipline._id === dbDiscipline.disciplineId) {
              discipline.declared = true;
              discipline.result = dbDiscipline.result;
              discipline.rank = dbDiscipline.rank;
              discipline.award = dbDiscipline.award;
            }
          });
        });
      });
    };

    $scope.update = function(isValid) {
      // if (saveCompetitorMutationButton)
      //   saveCompetitorMutationButton.start();
      $log.info('update teilnehmer called...: ' + isValid);
      if (isValid) {
        var teilnehmer = $scope.teilnehmer;
        teilnehmer.disciplines = $scope.selectDeclaredDisciplines($scope.allDisciplines);

        if (!teilnehmer.updated) {
          teilnehmer.updated = [];
        }
        teilnehmer.updated.push(new Date().getTime());

        teilnehmer.$update(function() {
          // if (saveCompetitorMutationButton) {
          //   $timeout(function() {
          //     saveCompetitorMutationButton.stop();
          //   }, 500);
          // }
          if ($scope.global.isCompetitorAdmin)
            $location.path('teilnehmer/administration');
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.isPossibleDiscipline = function(discipline) {
      if (($scope.teilnehmer === '') || ($scope.teilnehmer.gender === ''))
        return false;
      if (discipline.geschlecht === 'm' && $scope.teilnehmer.gender === 'female')
        return false;
      if (discipline.geschlecht === 'f' && $scope.teilnehmer.gender === 'male')
        return false;
      if (!$scope.teilnehmer.birthdate)
        return false;
      if (discipline.jahrgang_von > $scope.getJahrgang($scope.teilnehmer.birthdate))
        return false;
      if (discipline.jahrgang_bis < $scope.getJahrgang($scope.teilnehmer.birthdate))
        return false;
      return true;
    };

    $scope.selectDeclaredDisciplines = function(srcDisciplines) {
      //        $log.info('selectDeclaredDisciplines called...');
      var destDisciplines = [];
      srcDisciplines.forEach(function(discipline) {
        if (discipline.declared && $scope.isPossibleDiscipline(discipline)) {
          //                $log.info('selectDeclaredDisciplines... ' + JSON.stringify(discipline));
          destDisciplines.push({
            disciplineId: discipline._id,
            result: discipline.result,
            rank: discipline.rank,
            award: discipline.award
          });
        }
      });
      return destDisciplines;
    };

    $scope.deleteTeilnehmer = function(teilnehmer) {
      var msg = 'Soll der Teilnehmer wirklich gelöscht werden? \n\nDies kann nicht mehr rückgängig gemacht werden!';
      if (confirm(msg)) {
        teilnehmer.$delete(function () {
          $location.path('teilnehmer/administration');
        });
      }
    };

    $scope.checkCircle = function () {
      Teilnehmer.checkCircle($stateParams.circle).then(function (response) {
        $scope.res = response;
        $scope.resStatus = 'info';
      }, function (error) {
        $scope.res = error;
        $scope.resStatus = 'danger';
      });
    };
  }

  angular
    .module('mean.teilnehmer')
    .controller('TeilnehmerController', TeilnehmerController);

  TeilnehmerController.$inject = ['$scope', 'Global', 'Teilnehmer', '$stateParams', '$location', '$log', 'Wettkampf', 'Disziplin'];

})();
