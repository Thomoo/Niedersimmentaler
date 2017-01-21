(function() {
    'use strict';

    function Wettkampf($stateProvider) {
        $stateProvider.state('wettkampf', {
          url: '/wettkampf',
          templateUrl: 'wettkampf/views/wettkampf.html'
        });
    }

    angular
        .module('mean.wettkampf')
        .config(Wettkampf);

    Wettkampf.$inject = ['$stateProvider'];

})();
