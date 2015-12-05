'use strict';

module.exports = function() {
    var controller = ['$scope', '$uibModal', 'ManageCart', function ($scope, $uibModal, ManageCart) {
        $scope.showFullInfo = function($event) {
            $event.preventDefault();
            $scope.open();
            console.log('Product clicked!!');
            console.log($scope.productInfo);
            console.log($scope.activeView);
        };

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/templates/product/tpl.separate_product.html',
                controller: 'SeparateProductCtrl',
                size: size,
                resolve: {
                    params: function () {
                        return {
                            productInfo: $scope.productInfo,
                            activeView: $scope.activeView
                        };
                    }
                }
            });
        };

        $scope.addToCart = function ($event) {
            ManageCart.addProduct($scope.productInfo._id);

            if ($scope.productInfo.amount === 0) {
                $event.preventDefault();
            }
        }
    }]; 

    return {
        restrict: 'E',
        templateUrl: 'templates/product/tpl.product.html',
        scope: {
            productInfo: '=productinfo',
            activeView: '=active'
        },
        controller: controller
    };
};