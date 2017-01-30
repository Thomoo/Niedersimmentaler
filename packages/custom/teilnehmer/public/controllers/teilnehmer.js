(function() {
    'use strict';

    /* jshint -W098 */

    function TeilnehmerController($scope, Global, Teilnehmer, $stateParams) {
        $scope.global = Global;
        $scope.package = {
            name: 'teilnehmer'
        };

        $scope.checkCircle = function() {
            Teilnehmer.checkCircle($stateParams.circle).then(function(response) {
                $scope.res = response;
                $scope.resStatus = 'info';
            }, function(error) {
                $scope.res = error;
                $scope.resStatus = 'danger';
            });
        };
    }

    angular
        .module('mean.teilnehmer')
        .controller('TeilnehmerController', TeilnehmerController);

    TeilnehmerController.$inject = ['$scope', 'Global', 'Teilnehmer', '$stateParams'];

})();
