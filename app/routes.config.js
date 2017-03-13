let routeFunction = function(locProvider, stateProvider) {
  locProvider.html5Mode(true);

  stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'main.html',
      controller: 'WidgetController',
      controllerAs: 'vm'
    })
}

routeFunction.$inject = ['$locationProvider', '$stateProvider'];

export default routeFunction;