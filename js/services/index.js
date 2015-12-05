'use strict';

var localCache = require('./local_cache_service'),
    uploadData = require('./upload_data_service'),
    manageCart = require('./manage_cart_service');

module.exports = angular.module('app.services', [])
    .provider('LocalCache', localCache)
    .provider('ManageCart', manageCart)
    .factory('UploadData', uploadData);