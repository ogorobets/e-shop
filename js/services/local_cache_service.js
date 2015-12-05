'use strict';

module.exports = function LocalCacheProvider() {
    this.setDefaultObj = function() {
        var localCache = localStorage.getItem('LocalCacheAngularService');
        if (!localCache) {
            // Initial value
            localCache = {
                items: {},
                nextItemId: 0
            };
            
            localStorage.setItem('LocalCacheAngularService', JSON.stringify(localCache));
        }
    };

    this.$get = function() {
        return {
            find: function(id) {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                return localCache.items[id];
            },
            findByKey: function(key) {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                var requestedObj;
                for (var i in localCache.items) {
                    if (localCache.items[i].key === key) {
                        requestedObj = localCache.items[i];
                        break;
                    }
                }
                return requestedObj;
            },
            all: function() {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                return localCache.items;
            },
            create: function(newItem, key) {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                var item = {
                    val: newItem
                };
                if (key) {
                    item.key = key;
                } else {
                    item.key = null;
                }
                item.id = localCache.nextItemId;
                localCache.items[localCache.nextItemId] = item;
                localCache.nextItemId++;
                localStorage.setItem('LocalCacheAngularService', JSON.stringify(localCache));
            },
            update: function(item) {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                localCache.items[item.id] = item;
                localStorage.setItem('LocalCacheAngularService', JSON.stringify(localCache));
            },
            remove: function(id) {
                var localCache = JSON.parse(localStorage.getItem('LocalCacheAngularService'));
                delete localCache.items[id];
                localStorage.setItem('LocalCacheAngularService', JSON.stringify(localCache));
            }
        };
    };
};