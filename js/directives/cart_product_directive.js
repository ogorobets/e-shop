'use strict';

module.exports = ['ManageCart', 'LocalCache', function(ManageCart, LocalCache) {
    return {
        restrict: 'E',
        templateUrl: 'templates/product/tpl.cart_product.html',
        scope: {
            product: '=product',
            calcFinalSum: '&calcFinalSum',
            renewProductsList: '&renewProductsList'
        },
        link: function(scope, elem, attrs) {
            var directiveImgEl = elem.find('img')[0];
            var newImgHeight;
            var element = document.createElement('img');
            element.src = '/img/' + scope.product.imgs[0];
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            document.getElementsByTagName('body')[0].appendChild(element);           
            element.addEventListener('load', function checkImgSize() {
                newImgHeight = element.offsetHeight / 2;
                directiveImgEl.style.height = newImgHeight + 'px';
                element.removeEventListener('load', checkImgSize);
                element.parentNode.removeChild(element);
            }, false); 

            scope.productAmount = scope.product.cart_amount;
            scope.sum = scope.product.cart_amount * scope.product.price;

            scope.decreaseAmount = function ($event) {
                $event.preventDefault();
                var newAmount = ManageCart.changeProductAmount(scope.product._id, 1, 'subtract');
                if (newAmount !== false) {
                    scope.productAmount = newAmount;
                    scope.sum = newAmount * scope.product.price;
                    scope.calcFinalSum();
                }
            };     

            scope.increaseAmount = function ($event) {
                $event.preventDefault();
                var newAmount = ManageCart.changeProductAmount(scope.product._id, 1, 'add');
                if (newAmount !== false) {
                    scope.productAmount = newAmount;
                    scope.sum = newAmount * scope.product.price;
                    scope.calcFinalSum();
                }
            };

            scope.removeProduct = function ($event) {
                $event.preventDefault();
                ManageCart.removeProduct(scope.product._id);
                scope.renewProductsList({toCalcTotalSum: true});
            };
        }
    };
}];