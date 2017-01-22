(function() {
    'use strict';

    function Disziplin($stateProvider) {
        $stateProvider.state('disziplin', {
            url: '/disziplin',
            templateUrl: 'disziplin/views/disziplin.html'
        });
    }

    angular
        .module('mean.disziplin')
        .config(Disziplin);

    Disziplin.$inject = ['$stateProvider'];

})();
