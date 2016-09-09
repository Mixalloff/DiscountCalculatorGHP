(function() {
    'use strict';
    angular
        .module('app.cart', []);
})();
(function() {
  'use strict';
  angular
    .module('app.core', [
      'ui.router',
      'ngResource',
      'ngMessages',
      'ngMaterial',
      'ngCookies'
    ])
})();

(function() {
    'use strict';
    angular
        .module('app',
        [
            'app.core',
            'app.cart'
        ])
        .run(function($http, $cookies, $rootScope) {
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

                // Обработка специфичных ошибок
                $rootScope.$on('$stateChangeError', function() {
                    var error = arguments[5];
                    throw error;
                });
            }
        );
})();

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
(function() {
    'use strict';
    angular
        .module('app.cart')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('cart', {
                    url: '/',
                    templateUrl: 'app/cart/view.html',
                    controller: 'CartController',
                    controllerAs: 'cart'
                })
            $urlRouterProvider.otherwise('/');
        })
})();
(function(){
    'use strict';
    angular
        .module('app')
        .config(['$resourceProvider', function($resourceProvider){
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]);
})();

(function(){
    'use strict';
    angular
        .module('app')
        .controller("AppController", appController);

    function appController() {
        var vm = this;
    } 
})();
(function() {
    'use strict';
    angular
        .module('app')
        .config(function ($stateProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $stateProvider
                .state('app', {
                    abstract: true,
                    template: '<ui-view></ui-view>',
                })
        });
})();
