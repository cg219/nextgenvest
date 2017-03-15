import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Chartist from 'angular-chartist.js';
import Resource from 'angular-resource';

import routes from './routes.config.js';
import Rates from './services/Rates';
import WidgetController from './controllers/widget';
import styles from './styles/index.scss';

angular.module('WidgetTest', [uiRouter, Chartist, Resource])
  .config(routes)
  .service('Rates', Rates)
  .controller('WidgetController', WidgetController)