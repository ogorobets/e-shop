'use strict';

module.exports = ['$scope', 'UploadData', 'LocalCache',
    function($scope, UploadData, LocalCache) {
        $scope.active = {
            threeColumns: true,
            oneColumn: false
        };

        $scope.setView = function(state) {
            for (var key in $scope.active) {
                $scope.active[key] = false;
            }
            $scope.active[state] = true;
        };

        $scope.selectedDropdownItem = "От нижней к верхней цене";
        $scope.predicate = 'price';
        $scope.reverse = false;

        $scope.sortOptions = [
            'От нижней цены к верхней', 
            'От верхней цены к нижней', 
            'По новизне', 
            'По названию от А к Я', 
            'По названию от Я к А', 
            'Наименьшее количество',
            'Наибольшее количество'
        ];

        $scope.sortPredicates = [
            'price', 
            'price', 
            'releaseDate', 
            'title', 
            'title', 
            'amount',
            'amount'
        ];

        $scope.sortReverse = [
            false, 
            true, 
            true, 
            false, 
            true, 
            false,
            true
        ];

        $scope.onItemClick = function(option) {
            $scope.selectedDropdownItem = option;
            var optionIndex = $scope.sortOptions.indexOf(option);
            $scope.predicate = $scope.sortPredicates[optionIndex];
            $scope.reverse = $scope.sortReverse[optionIndex];
            console.log($scope.predicate );
            console.log($scope.reverse );
        };

        $scope.goods = []; 
        var initJsonFileUrl = '/DB/goods.json';
        var decodeProps = ['title', 'shortDescr'];
        var goodsFromLC = LocalCache.findByKey('goods');
        if (goodsFromLC) {
            $scope.goods = goodsFromLC.val;
        } else {
            UploadData.getData(initJsonFileUrl, decodeProps, 'goods').then(function() {
                $scope.goods = LocalCache.findByKey('goods').val;
                console.log($scope.goods);
            });
        }
         
    }
];
