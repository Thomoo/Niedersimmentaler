(function() {
    'use strict';

    function Wettkampf($http, $q) {
        return {
            name: 'wettkampf',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/wettkampf/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.wettkampf')
        .factory('Wettkampf', Wettkampf);

    Wettkampf.$inject = ['$http', '$q'];

})();
