/*!
 * promise-timeout-plus <https://github.com/AndreasPizsa/promise-timeout-plus>
 *
 * Copyright (c) 2016, Andreas Pizsa.
 * Licensed under the MIT License.
 */

'use strict';

var globals = require('global-var');

module.exports = function (PromiseLib, overwriteExistingFunction) {
  PromiseLib = PromiseLib || Promise;

  const prototype = require('promise-prototype')(PromiseLib);
  if(prototype.timeout && !overwriteExistingFunction) return;

  prototype.timeout = function(ms, messageOrError) {
    var originalPromise = this;

    return new Promise( function(resolve,reject) {
      globals.setTimeout(reject.bind(this,messageOrError),ms);
      originalPromise.then(resolve,reject);
    });
  }
};
