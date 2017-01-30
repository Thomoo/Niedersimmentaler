(function() {
    'use strict';

    function Teilnehmer($stateProvider) {
        $stateProvider.state('teilnehmer example page', {
            url: '/teilnehmer/example',
            templateUrl: 'teilnehmer/views/index.html'
        }).state('teilnehmer circles example', {
            url: '/teilnehmer/example/:circle',
            templateUrl: 'teilnehmer/views/example.html'
        });
    }

    angular
        .module('mean.teilnehmer')
        .config(Teilnehmer);

    Teilnehmer.$inject = ['$stateProvider'];

})();
