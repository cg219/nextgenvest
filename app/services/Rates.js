import angular from 'angular';

class Rates {
  constructor(resource) {
    this.resource = resource('/api/rate', null, {
      'get': {
        method: 'GET',
        responseType: 'text'
      }
    });
  }

  getUnsubRate() {
    return this.resource.get();
  }
}

Rates.$inject = ['$resource'];

export default Rates