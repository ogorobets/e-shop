'use strict';

module.exports = ['$scope', '$uibModalInstance', 'ManageCart', 'params',
    function($scope, $uibModalInstance, ManageCart, params) {
        $scope.productInfo = params.productInfo;
        $scope.activeView = params.activeView;

        $scope.close = function () {
            $uibModalInstance.dismiss('close');
        };

        $scope.addToCart = function ($event) {
            ManageCart.addProduct($scope.productInfo._id);

            if ($scope.productInfo.amount === 0) {
                $event.preventDefault();
            } else {
                $scope.close();
            }
        }
    }
];