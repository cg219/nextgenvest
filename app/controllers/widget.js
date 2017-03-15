import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Chartist from 'chartist';

const MONTHS_IN_YEAR = 12;
let sequence = 0;
let seriesData = [];

class WidgetController {
  constructor(Rates, scope) {
    this.scope = scope;
    this.amount = 60000;
    this.interest = 0.15;
    this.period = 24;
    this.unsubRate = Rates.getUnsubRate();
    this.chart = {
      data: {
        labels: this.createLabels(this.period),
        series: [this.createSeries()]
      },
      options: {
        chartPadding: {
          right: 40
        },
        horizontalBars: true,
        distributedSeries: true,
        seriesBarDistance: 5,
        low: 0,
        height: '700px'
      },
      events: {
        created: function(data, more) {
          sequence = 0;
        },
        draw: function(data) {
          if (data.type === 'line') {
            data.element.animate({
              opacity: {
                begin: 500,
                dur: 1000,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeOutQuart
              }
            })
          } else if (data.type === 'point') {
            data.element.animate({
              opacity: {
                begin: 200 * data.index,
                dur: 500,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeOutQuart
              },
              y1: {
                begin: 200 * data.index,
                dur: 500,
                from: data.y + 10,
                to: data.y,
                easing: Chartist.Svg.Easing.easeOutQuart
              },
              y2: {
                begin: 200 * data.index,
                dur: 500,
                from: data.y + 10,
                to: data.y,
                easing: Chartist.Svg.Easing.easeOutQuart
              }
            })
          } else if (data.type === 'area') {
            data.element.animate({
              opacity: {
                begin: 500,
                dur: 1500,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeOutQuart
              }
            })
          } else if (data.type === 'bar') {
            let label = new Chartist.Svg('text');

            label.text(`$${Math.round(seriesData[sequence])}`);
            label.attr({
              x: (data.x1 + data.element.width() - 10),
              y: (data.y1 + (20 * .12)),
              'text-anchor': 'end',
              style: 'font-size: 10px; fill: #fff;'
            })

            data.group.append(label);
            
            data.element.attr({
              style: 'stroke-width: 20px'
            });

            data.element.animate({
              opacity: {
                begin: 200 * data.index,
                dur: 500,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeOutQuart
              },
              x2: {
                begin: 200 * data.index,
                dur: 1000,
                from: data.x1,
                to: data.x2,
                easing: Chartist.Svg.Easing.easeOutQuart
              }
            })

            label.animate({
              opacity: {
                begin: 300 * data.index,
                dur: 1000,
                from: 0,
                to: 1,
                easing: Chartist.Svg.Easing.easeOutQuart
              }
            })

            sequence++;
          } else if (data.type === 'grid') {
            data.element.attr({
              style: 'opacity: 0'
            });
          }
        }
      }
    }

    this.init();
  }

  init() {
    this.scope.$watch(() => this.amount, this.paymentsChange.bind(this));
    this.scope.$watch(() => this.interest, this.paymentsChange.bind(this));
    this.scope.$watch(() => this.period, this.paymentPeriodChange.bind(this));
  }

  paymentsChange(newValue) {
    this.chart.data.series = [this.createSeries()];
  }

  paymentPeriodChange(newValue) {
    this.chart.data = {
      labels: this.createLabels(this.period),
      series: [this.createSeries()]
    }
  }

  createLabels(timeSpan) {
    let labelsArray = [];
    let i = 1;

    for (i; i <= timeSpan; i++) {
      labelsArray.push(`${i}`);
    }

    return labelsArray;
  }

  createSeries() {
    const ratePerPeriod = (this.interest / MONTHS_IN_YEAR);
    let series = [];

    // Grabbed Loan Repayment Formula from http://www.financeformulas.net/Loan_Payment_Formula.html
    let payment = (ratePerPeriod * this.amount) / (1 - Math.pow((1 + ratePerPeriod), this.period * -1));
    let i = 0;
    let newAmount = payment * this.period;

    for (i; i < this.period; i++) {
      if (i > 0) {
        newAmount -= payment;
      }

      series.push(newAmount);
    }

    seriesData = series;
    return series;
  }
}

WidgetController.$inject = ['Rates', '$scope'];

export default WidgetController;