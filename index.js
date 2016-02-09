/*!
 * promise-timeout-plus <https://github.com/AndreasPizsa/promise-timeout-plus>
 *
 * Copyright (c) 2016, Andreas Pizsa.
 * Licensed under the MIT License.
 */

'use strict';

const globals = global; typeof window !== 'undefined' ? window : global;

module.exports = function (PromiseLib) {
  PromiseLib = PromiseLib || Promise;

  const prototype = PromiseLib.resolve(true).constructor.prototype;
  if(prototype.timeout) return;

  prototype.timeout = function(ms, messageOrError) {
    const originalPromise = this;

    return new Promise( function(resolve,reject) {

      var timerId = globals.setTimeout(function(){
        timerId = undefined;
        reject(messageOrError);
      },ms);

      originalPromise.then(resolve,reject);

    });
  }
};
