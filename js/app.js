'use strict'

require('angular');
var uiRouter = require('ui-router');
var uiBootstrap = require('angular-bootstrap-npm');

var directives = require('./directives');
var controllers = require('./controllers');
var services = require('./services');
angular.module('eShop', [uiRouter, uiBootstrap, controllers.name, services.name, directives.name])
.config(function (LocalCacheProvider) {  
    LocalCacheProvider.setDefaultObj();
});
var router = require('./router');