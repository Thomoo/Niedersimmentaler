'use strict';

angular.module('mean.teilnehmer').factory('Teilnehmer', ['$resource',
  function ($resource) {
    return $resource('/api/teilnehmer/:teilnehmerId', {
      teilnehmerId: '@_id'
    }, {
      update: {method: 'PUT'},
      delete: {method: 'DELETE', params: {teilnehmerId: '@_id'}},
      toggleStartNr: {method: 'POST', params: {teilnehmerId: '@_id'}}
    });
  }]);

