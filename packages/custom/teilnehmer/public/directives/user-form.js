'use strict';

angular.module('mean.teilnehmer').directive('userForm', ['$log', function () {
  return {
    restrict: 'E',
    scope: {
      readonly: '=',
      teilnehmer: '=',
      valid: '='
    },
    templateUrl: 'teilnehmer/views/user-form.html'
  };
}]);
