import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Chartist from 'chartist';

const MONTHS_IN_YEAR = 12;

class WidgetController {
  constructor(Rates) {
    this.name = 'widgetController';
    this.amount = 60000;
    this.interest = 0.05;
    this.period = 6;
    this.unsubRate = Rates.getUnsubRate();
    this.chart = {
      data: {
        labels: this.createLabels(this.period),
        series: [this.createSeries()]
      },
      options: {
        fullWidth: true,
        chartPadding: {
          right: 40
        },
        showArea: true,
        low: 0
      },
      events: {
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
          }
        }
      }
    }
  }

  createLabels(timeSpan) {
    let labelsArray = [];
    let i = 1;

    for (i; i <= timeSpan; i++) {
      labelsArray.push(`Month ${i}`);
    }

    return labelsArray;
  }

  createSeries() {
    const ratePerPeriod = (this.interest / MONTHS_IN_YEAR);
    let series = [];

    // Grabbed Loan Repayment Formula from http://www.financeformulas.net/Loan_Payment_Formula.html
    let payment = (ratePerPeriod * this.amount) / (1 - Math.pow((1 + ratePerPeriod), this.period * -1));
    let i = 0;
    let newAmount = this.amount;

    for (i; i < this.period; i++) {
      if (i > 0) {
        newAmount -= payment;
      }

      series.push(newAmount);
    }

    return series;
  }
}

WidgetController.$inject = ['Rates'];

export default WidgetController;