(function() {
    'use strict';

    /* jshint -W098 */

    function WettkampfController($scope, Global, Wettkampf, $log, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'wettkampf'
        };

        $scope.checkCircle = function() {
            Wettkampf.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };

        $scope.loadWettkampf = function(cb) {
          $log.info('load Wettkampf...');
          Wettkampf.get({
          }, function(wettkampf) {
            $scope.wettkampf = wettkampf;
            if (cb) {
              cb();
            }
          });
        };

        $scope.saveWettkampf = function(isValid) {
          if (isValid) {
            $log.info('save Wettkampf...');
            var wettkampf = new Wettkampf({
              title: $scope.wettkampf.title,
              infoTextActive: $scope.wettkampf.infoTextActive,
              infoTextInactive: $scope.wettkampf.infoTextInactive,
              anmeldungActive: $scope.wettkampf.anmeldungActive
            });
            wettkampf.$save();
            $scope.wettkampfForm.$setPristine();
          }
        };
    }

    angular
        .module('mean.wettkampf')
        .controller('WettkampfController', WettkampfController);

    WettkampfController.$inject = ['$scope', 'Global', 'Wettkampf', '$log', '$stateParams'];

})();
