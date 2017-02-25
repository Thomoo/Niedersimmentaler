(function () {
  'use strict';

  function Result($stateProvider) {

    $stateProvider.state('result enter-result', {
      url: '/result/enter-result',
      templateUrl: 'result/views/enter-result.html'
    }).state('result select-lists', {
      url: '/result/select-lists',
      templateUrl: 'result/views/select-lists.html'
    }).state('result start-lists', {
      url: '/result/start-lists',
      templateUrl: 'result/views/start-lists.html'
    }).state('result rankings', {
      url: '/result/rankings',
      templateUrl: 'result/views/rankings.html'
    });
  }

  angular
    .module('mean.result')
    .config(Result);

  Result.$inject = ['$stateProvider'];

})();
