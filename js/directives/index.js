'use strict';

var productDirective = require('./product_directive'),
    cartProductDirective = require('./cart_product_directive');

module.exports = angular.module('app.directives', [])
    .directive('esProduct', productDirective)
    .directive('esCartProduct', cartProductDirective);
