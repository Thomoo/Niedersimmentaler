'use strict';

//Wettkampf service used for wettkampf REST endpoint
angular.module('mean.wettkampf').factory('Wettkampf', ['$resource',
  function($resource) {
    return $resource('api/wettkampf', {
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

