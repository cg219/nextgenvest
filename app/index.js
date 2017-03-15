import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './routes.config.js';
import WidgetController from './controllers/widget';
import Chartist from 'angular-chartist.js';
import styles from './styles/index.scss';

angular.module('WidgetTest', [uiRouter, Chartist])
  .config(routes)
  .controller('WidgetController', WidgetController)