import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './routes.config.js';
import WidgetController from './controllers/widget';

angular.module('WidgetTest', [])
  .config(routes)
  .controller('WidgetController', WidgetController)