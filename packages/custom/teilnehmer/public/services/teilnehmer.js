'use strict';

angular.module('mean.teilnehmer').factory('Teilnehmer', ['$resource',
  function ($resource) {
    return $resource('/api/teilnehmer/:teilnemerId', {
      competitorId: '@_id'
    }, {
      update: {method: 'PUT'},
      delete: {method: 'DELETE', params: {competitorId: '@_id'}},
      toggleStartNr: {method: 'POST', params: {competitorId: '@_id'}}
    });
  }]);

