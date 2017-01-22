(function() {
    'use strict';

    /* jshint -W098 */

    function DisziplinController($scope, Global, Disziplin, $log, $filter, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'disziplin'
        };

        $scope.checkCircle = function() {
            Disziplin.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.loadDisciplins = function(cb) {
          $log.info('load Disziplin...');
          Disziplin.query(function(disziplins){
            $scope.disziplins = disziplins;
            if (cb) {
              cb();
            }
          });
        };

        // ---------------------------------
        // DISZIPLIN
        // ---------------------------------
        // functions
        $scope.removeDisziplin = function(disziplin) {
          $log.info('remove Disziplin...');
          if (disziplin) {
            disziplin.$remove();
            for (var i in $scope.disziplins) {
              if ($scope.disziplins[i] === disziplin) {
                $scope.disziplins.splice(i, 1);
              }
            }
          } else {
            $scope.disziplin.$remove(function(response) {
              $log.info('removed');
            });
          }
        };

        $scope.addDisziplin = function() {
          $log.info('add Disziplin...');
          var disziplin = new Disziplin({
            geschlecht : null,
            sortierung : null
          });
          $scope.inserted = disziplin;
          $scope.disziplins.push(disziplin);
        };

        $scope.saveDisziplin = function(data, disziplin) {
          $log.info('save Disziplin...');
          var id = disziplin._id;
          angular.copy(data, disziplin);
          if (id) {
            disziplin._id = id;
            disziplin.$update(function(response) {
              $log.info('updated');
            });
          } else {
            disziplin.$save(function(response) {
              $log.info('saved');
            });
          }
        };

        // cancel all changes
        $scope.cancelDisziplin = function(index, disziplin) {
          $log.info('cancel Disziplin...');
          // falls disziplin noch nicht gespeichert, muss sie aus der liste gelöscht werden.
          if (!disziplin._id) {
            $scope.disziplins.splice(index, 1);
          }
        };

        //  daten validieren
        $scope.checkDisziplin = function(data, id) {
  //        $log.debug('checkDisziplin in administration called...');
          if (!data) {
            return 'Es muss eine Disziplin angegeben werden.';
          }
        };

        $scope.checkBezeichnung = function(data, id) {
  //        $log.debug('checkBezeichnung in administration called...');
          if (!data) {
            return 'Es muss eine Bezeichnung angegeben werden.';
          }
        };

        $scope.checkJahrgang = function(data, disziplin) {
  //        $log.debug('checkJahrgang in administration called...');
          if (!data) {
            return 'Es muss ein Jahrgang angegeben werden.';
          }
          if (/^\d{4}$/.exec(data) === null) {
            return 'Der Jahrgang muss mit 4 Zahlen definiert werden.';
          }
        };

        $scope.checkGeschlecht = function(data) {
  //        $log.debug('checkGeschlecht in administration called...');
          if (!data) {
            return 'Es muss eine Geschlecht ausgewählt werden.';
          }
        };

        $scope.checkSortierung = function(data) {
  //        $log.debug('checkSortierung in administration called...');
          if (!data) {
            return 'Es muss eine Sortierung ausgewählt werden.';
          }
        };

        $scope.checkFormat = function(data) {
  //        $log.debug('checkFormat in administration called...');
          if (!data) {
            return 'Es muss eine Format ausgewählt werden.';
          }
        };

        // daten aufbereiten
        $scope.geschlechter = [{
          value : 'm',
          text : 'männlich'
        }, {
          value : 'f',
          text : 'weiblich'
        }, {
          value : 'both',
          text : 'beides'
        }];

        $scope.sortierungen = [{
          value : 'ASC',
          text : 'aufsteigend'
        }, {
          value : 'DESC',
          text : 'absteigend'
        }];

        var time1Val = JSON.stringify({
          placeholder: 'ss.hh',
          // validate : '^\\d{1,2}\\.\\d{2}$',
          validate : '^\\d{2}\\.\\d{2}$',
          format : '(function(val){return val.replace(/^0+(?=\\d\\.)/, "") + "sec";})'
        });
        var time2Val = JSON.stringify({
          placeholder: 'mm:ss.h',
          validate : '^\\d{2}:[0-5]\\d\\.\\d{1}$',
          format : '(function(val){return val.replace(/^0+(?=\\d\\:)/, "").replace(":", "min ") + "sec";})'
        });
        var distance1Val = JSON.stringify({
          placeholder: 'm',
          validate : '^\\d+$',
          format : '(function(val){return val + "m";})'
        });
        var distance2Val = JSON.stringify({
          placeholder: 'm.cm',
          validate : '\\d+\\.\\d{2}$',
          format : '(function(val){return val + "m";})'
        });
        var punkte1Val = JSON.stringify({
          placeholder: 'x',
          validate : '^\\d+$',
          format : '(function(val){return val + "pte";})'
        });
        var rang1Val = JSON.stringify({
          placeholder: 'x',
          validate : '^\\d+$',
          format : '(function(val){return val;})'
        });

        $scope.formats = [{
          value : time1Val,
          text : 'time: ss.hh'
        }, {
          value : time2Val,
          text : 'time: mm:ss.h'
        }, {
          value : distance1Val,
          text : 'distance: m'
        }, {
          value : distance2Val,
          text : 'distance: m.cm'
        }, {
          value : punkte1Val,
          text : 'punkte: x'
        }, {
          value : rang1Val,
          text : 'rang: x'
        }];

        $scope.showGeschlecht = function(disziplin) {
  //        $log.debug('showGeschlecht in administration called...');
          var selected = [];
          if (disziplin.geschlecht) {
            selected = $filter('filter')($scope.geschlechter, {
              value : disziplin.geschlecht
            });
          }
          return selected.length ? selected[0].text : 'Not set';
        };

        $scope.showSortierung = function(disziplin) {
  //        $log.debug('showSortierung in administration called...');
          var selected = [];
          if (disziplin.sortierung) {
            selected = $filter('filter')($scope.sortierungen, {
              value : disziplin.sortierung
            });
          }
          return selected.length ? selected[0].text : 'Not set';
        };

        $scope.showFormat = function(disziplin) {
  //        $log.debug('showFormat in administration called...');
          var selected = [];
          if (disziplin.format) {
            selected = $filter('filter')($scope.formats, {
              value : disziplin.format
            });
          }
          return selected.length ? selected[0].text : 'Not set';
        };

    }

    angular
        .module('mean.disziplin')
        .controller('DisziplinController', DisziplinController);

    DisziplinController.$inject = ['$scope', 'Global', 'Disziplin', '$log', '$filter', '$stateParams'];

})();
