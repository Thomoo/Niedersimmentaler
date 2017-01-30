'use strict';

angular.module('mean.teilnehmer').directive('userForm',['$log', function($log) {
    return {
        restrict : 'E',
        scope: {
          showAward: '=',
          readonly: '=',
          teilnehmer: '='
        },
        templateUrl : 'teilnehmer/views/user-form.html'
    };
}]);
