'use strict';

module.exports = function ManageCartProvider() {  
    this.$get = function(LocalCache) {
        var cart = LocalCache.findByKey('cart');
        if (!cart) {
            LocalCache.create({}, 'cart');
        }

        function isProductAvailable(prodId, amount) {
            var goods = LocalCache.findByKey('goods').val;
            var product;
            for (var i = 0; i < goods.length; i++) {
                if (goods[i]._id === prodId) {
                    product = goods[i];
                    break;
                }
            }
            if ( product && ( product.amount >= amount ) ) {
                return true;
            } else {
                return false;
            }
        }

        function changeProductAmountLC(prodId, amount, operation) {
            var goodsObj = LocalCache.findByKey('goods');
            var goods = goodsObj.val;
            var product;
            
            if (operation === 'subtract') {
                amount = amount * (-1);
            }

            for (var i = 0; i < goods.length; i++) {
                if (goods[i]._id === prodId) {
                    product = goods[i];
                    break;
                }
            }

            product.amount = product.amount + amount;
            LocalCache.update(goodsObj);
       
        }

        return {
            addProduct: function (prodId) {
                this.changeProductAmount(prodId, 1, 'add');
            },
            removeProduct: function (prodId) {
                var cartObj = LocalCache.findByKey('cart');
                var cart = cartObj.val;
                var currProduct = cart[prodId];
                var amount = currProduct.amount;
                changeProductAmountLC(prodId, amount, 'add');
                delete cart[prodId];
                LocalCache.update(cartObj);
            },
            removeAllProducts: function() {
                var cartObj = LocalCache.findByKey('cart');
                var cart = cartObj.val;
                var currProduct;
                var amount;
                var prodId;
                
                for (var key in cart) {
                    currProduct = cart[key];
                    amount = currProduct.amount;
                    prodId = key;
                    changeProductAmountLC(prodId, amount, 'add');
                }
              
                cartObj.val = {};
                LocalCache.update(cartObj);
            },
            changeProductAmount: function (prodId, amount, operation) {
                var amount = Math.abs(amount) || 1;
                var operation = operation || 'add';
                var cartObj = LocalCache.findByKey('cart');
                var cart = cartObj.val;
                var currProduct = cart[prodId];
                var finalAmount;
                
                if (!currProduct) {
                    currProduct = {
                        _id: prodId
                    };    
                    finalAmount = 1;               
                } else if (operation === 'add') {
                    finalAmount = currProduct.amount + amount;
                } else if (operation === 'subtract') { 
                    finalAmount = currProduct.amount - amount;
                }

                if (operation === 'add') {
                    if (isProductAvailable(prodId, amount)) {
                        currProduct.amount = finalAmount;
                        changeProductAmountLC(prodId, amount, 'subtract');
                        cart[prodId] = currProduct;
                        LocalCache.update(cartObj);
                        return finalAmount;
                    } else {
                        return false;
                    }
                } else if (operation === 'subtract') {
                    if (finalAmount > 0) {
                        currProduct.amount = finalAmount;
                        changeProductAmountLC(prodId, amount, 'add');
                        cart[prodId] = currProduct;
                        LocalCache.update(cartObj);
                        return finalAmount;
                    } else {
                        return false;
                    }
                }
                
            },
            setNewProductAmount: function (prodId, amount) {
                var amount = Math.abs(amount);
                var cartObj = LocalCache.findByKey('cart');
                var cart = cartObj.val;
                var currProduct = cart[prodId];
                var deltaAmount;

                deltaAmount = currProduct.amount - amount;

                if (deltaAmount > 0) {
                    currProduct.amount = amount;
                    changeProductAmountLC(prodId, deltaAmount, 'add');
                    LocalCache.update(cartObj);
                    return true;
                } else {
                    if (isProductAvailable(prodId, Math.abs(deltaAmount))) {
                        currProduct.amount = amount;
                        changeProductAmountLC(prodId, Math.abs(deltaAmount), 'subtract');
                        LocalCache.update(cartObj);
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            processOrder: function () {
                var cartObj = LocalCache.findByKey('cart');
                cartObj.val = {};
                LocalCache.update(cartObj);
            },
            getAllProducts: function() {
                var cartObj = LocalCache.findByKey('cart');
                var cart = cartObj.val;
                var goodsObj = LocalCache.findByKey('goods');
                var goods = goodsObj.val;
                var product;
                var newProduct;
                var products = [];

                var prodId;
                for (var key in cart) {
                    prodId = key;
                    for (var i = 0; i < goods.length; i++) {
                        if (goods[i]._id === prodId) {
                            product = goods[i];
                            break;
                        }
                    }
                    newProduct = angular.copy(product);
                    newProduct.cart_amount = cart[key].amount;
                    products.push(newProduct);
                }

                return products;
            }
        };
    };
};