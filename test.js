/**
 * Created by developer on 2/9/16.
 */

const should = require('should');

describe("Promise.timeout()", function(){
  it('adds a `timeout` method to Promise instances', function(){
    require('.')();
    (typeof Promise.resolve(true).constructor.prototype.timeout).should.be.equal('function');
  });

  it('rejects promise upon timeout', function(done){
    const timeout = 1000;
    this.timeout(timeout*2);
    return new Promise(function(){})
      .timeout(timeout)
      .catch(done);
  });

  it('resolves promise without timeout', function(done){
    const timeout = 2000;
    this.timeout(timeout*2);
    return new Promise(function(resolve,reject){
      setTimeout(resolve,timeout>>2);
    })
      .timeout(timeout)
      .then(done);
  });

  it('rejects promise without timeout', function(done){
    const timeout = 2000;
    this.timeout(timeout*2);
    return new Promise(function(resolve,reject){
      setTimeout(reject,timeout>>2);
    })
      .timeout(timeout)
      .catch(done);
  });

  it('fulfills resolved Promise without timeout', function(done){
    Promise.resolve(false).timeout(100).then(done);
  });

  it('fulfills rejected Promise without timeout', function(done){
    Promise.reject(false).timeout(100).catch(done);
  });
});
