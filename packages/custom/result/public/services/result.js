(function() {
    'use strict';

    function Result($http, $q) {
        return {
            name: 'result',
            checkCircle: function(circle) {
                var deferred = $q.defer();

                $http.get('/api/result/example/' + circle).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
                return deferred.promise;

            }
        };
    }

    angular
        .module('mean.result')
        .factory('Result', Result);

    Result.$inject = ['$http', '$q'];

})();
