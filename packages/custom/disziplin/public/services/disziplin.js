'use strict';

angular.module('mean.disziplin').factory('Disziplin', ['$resource',
  function($resource) {
    return $resource('api/disziplins/:disziplinId', {
      disziplinId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
