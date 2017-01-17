(function() {
    'use strict';

    /* jshint -W098 */

    function WettkampfController($scope, Global, Wettkampf, $stateParams) {
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
    }

    angular
        .module('mean.wettkampf')
        .controller('WettkampfController', WettkampfController);

    WettkampfController.$inject = ['$scope', 'Global', 'Wettkampf', '$stateParams'];

})();
