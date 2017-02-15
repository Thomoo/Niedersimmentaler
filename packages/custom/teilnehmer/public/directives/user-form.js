'use strict';

angular.module('mean.teilnehmer').directive('userForm', ['$log', function () {
  return {
    restrict: 'E',
    scope: {
      readonly: '=?',
      teilnehmer: '=',
      valid: '=?',
      dirty: '=?'
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'teilnehmer/views/user-form.html',
    controller: function () {
      var ctrl = this;
    }
  };
}]);
