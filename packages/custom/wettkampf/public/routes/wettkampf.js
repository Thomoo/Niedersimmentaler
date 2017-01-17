(function() {
    'use strict';

    function Wettkampf($stateProvider) {
        $stateProvider.state('wettkampf example page', {
            url: '/wettkampf/example',
            templateUrl: 'wettkampf/views/index.html'
        }).state('wettkampf circles example', {
            url: '/wettkampf/example/:circle',
            templateUrl: 'wettkampf/views/example.html'
        });
    }

    angular
        .module('mean.wettkampf')
        .config(Wettkampf);

    Wettkampf.$inject = ['$stateProvider'];

})();
