let routeFunction = function(locProvider, urlProvider) {
  locProvider.html5Mode(true);
  urlProvider.otherwise("/")
}

routeFunction.$inject = ['$locationProvider', '$urlRouterProvider'];

export default routeFunction;