'use strict';

module.exports = ['$scope', 'ManageCart',   
    function($scope, ManageCart) {
        
        $scope.products = ManageCart.getAllProducts();
        $scope.showProducts = $scope.products.length;

        $scope.refreshProductsList = function (toCalcTotalSum) {
            $scope.products = ManageCart.getAllProducts();
            $scope.showProducts = $scope.products.length;
            if (toCalcTotalSum) {
                $scope.calcTotalSum($scope.products);
            }
        };

        $scope.clearCart = function () {
            ManageCart.removeAllProducts();
            $scope.refreshProductsList();
        };

        $scope.processOrder = function() {
            ManageCart.processOrder();
            $scope.refreshProductsList();
        }

        $scope.calcTotalSum = function(products) {
            products = products || ManageCart.getAllProducts();
            var tmpSum = 0;
            for (var i = 0; i < products.length; i++) {
                tmpSum += tmpSum + products[i].price * products[i].cart_amount;
            }
            $scope.totalSum = tmpSum;
        };

        $scope.calcTotalSum($scope.products);
    }
];
