(function () {
    'use strict';
    angular
        .module('app.cart')
        .controller('CartController', cartController);

    function cartController($scope) {
        var vm = this;
        vm.products = [];
        vm.addProduct = addProduct;
        vm.amount = 0;
        vm.totalDiscount = 0;
        vm.applyDiscount = applyDiscount;

        /**
         * Добавление продукта в корзину
         * 
         * @param {any} name Наименование
         * @param {any} price Стоимость
         */
        function addProduct(name, price) {
            var newProduct = {
                name: name,
                price: price
            };
            var added = false;
            for (var i = 0; i < vm.products.length; i++) {
                if (vm.products[i].price > price) {
                    vm.products.splice(i, 0, newProduct);
                    added = true;
                    break;
                }
            }
            if (!added) {
                vm.products.push(newProduct);
            }
            vm.amount += price;
            calculateProductsDiscount();
            $scope.addedProductName = $scope.addedProductPrice = '';
        }

        /**
         * Вычисление скидки по каждому товару в корзине
         */
        function calculateProductsDiscount() {
            var cartDiscount = 0;
            vm.products.forEach(function(product) {
                product.share = product.price / vm.amount;
                product.discount = Math.round(product.share * vm.totalDiscount);
                cartDiscount += product.discount;
            });
            vm.products[vm.products.length - 1].discount += vm.totalDiscount - cartDiscount;
        }

        /**
         * Применение скидки
         */
        function applyDiscount() {
            if (!vm.totalDiscount || vm.totalDiscount > vm.amount) {
                vm.totalDiscount = vm.amount;
            }
            calculateProductsDiscount();
        }
    }
})();