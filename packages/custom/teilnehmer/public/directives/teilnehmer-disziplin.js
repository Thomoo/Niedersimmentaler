'use strict';

angular.module('mean.teilnehmer').directive('teilnehmerDisziplin', ['$log', function () {

  return {
    restrict: 'E',
    scope: {
      showAward: '=',
      readonly: '=',
      disciplines: '=',
      teilnehmer: '='
    },
    templateUrl: 'teilnehmer/views/teilnehmer-disziplin.html',
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function () {
      var ctrl = this;

      ctrl.isPossibleDiscipline = function(discipline) {
        if ((ctrl.teilnehmer === '') || (ctrl.teilnehmer.gender === ''))
          return false;
        if (discipline.geschlecht === 'm' && ctrl.teilnehmer.gender === 'female')
          return false;
        if (discipline.geschlecht === 'f' && ctrl.teilnehmer.gender === 'male')
          return false;
        if (!ctrl.teilnehmer.birthdate)
          return false;
        if (discipline.jahrgang_von > ctrl.getJahrgang(ctrl.teilnehmer.birthdate))
          return false;
        if (discipline.jahrgang_bis < ctrl.getJahrgang(ctrl.teilnehmer.birthdate))
          return false;
        return true;
      };

      ctrl.getJahrgang = function(birthdate) {
        if (birthdate) {
          if (birthdate.length === 10) {
            return birthdate.substr(-4, 4);
          }
        }
      };
    }
  };
}]);
