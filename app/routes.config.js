import widgetTemplate from './views/widget.html';

let routeFunction = function(locProvider, urlProvider, stateProvider) {
  locProvider.html5Mode(true);
  urlProvider.otherwise("/");

  stateProvider
    .state('widget', {
      url: '/',
      template: widgetTemplate,
      controller: 'WidgetController',
      controllerAs: 'vm'
    })
}

routeFunction.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

export default routeFunction;