'use strict';

var wrapperCtrl = require('./wrapper_controller'),
    dashboardCtrl = require('./dashboard_controller'),
    separateProductCtrl = require('./separate_product_controller'),
    cartCtrl = require('./cart_controller');

module.exports = angular.module('app.controllers', [])
    .controller('WrapperCtrl', wrapperCtrl)
    .controller('DashboardCtrl', dashboardCtrl)
    .controller('SeparateProductCtrl', separateProductCtrl)
    .controller('CartCtrl', cartCtrl);