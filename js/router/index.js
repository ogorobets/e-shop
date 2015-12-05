'use strict';

module.exports = angular.module('eShop')
.config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
    function($httpProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('wrapper', {
                templateUrl: '/templates/wrapper/tpl.wrapper.html',
                controller: 'WrapperCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                parent: 'wrapper',
                templateUrl: '/templates/dashboard/tpl.dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('cart', {
                url: '/cart?productid',
                reloadOnSearch: false,
                parent: 'wrapper',
                templateUrl: '/templates/cart/tpl.cart.html',
                controller: 'CartCtrl'
            });
        $urlRouterProvider.otherwise('/dashboard');
    }
]);