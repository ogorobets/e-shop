'use strict';

module.exports = ['LocalCache', '$http', function UploadDataFactory(LocalCache, $http) {
    return {
        getData: function (fileUrl, decodeProps, dataKey) {
            return $http({
              method: 'GET',
              url: fileUrl
            }).then(function successCallback(response) {
                var data = response.data;
                if (decodeProps) {
                    for (var key in data) {
                        for (var i = 0;  i < decodeProps.length; i++) {
                            var currDecodeProp = decodeProps[i];
                            data[key][currDecodeProp] = decodeURIComponent(data[key][currDecodeProp]);
                        }
                    }
                }
                LocalCache.create(data, dataKey ? dataKey : undefined);
            }, function errorCallback(response) {
                console.log('Error: failed to get data from ' + fileUrl +' using AJAX request');
            });
        }
    };
}];