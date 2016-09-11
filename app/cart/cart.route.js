(function() {
    'use strict';
    angular
        .module('app.cart')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('cart', {
                    url: '/',
                    templateUrl: '/DiscountCalculatorGHP/app/cart/view.html',
                    controller: 'CartController',
                    controllerAs: 'cart'
                })
            $urlRouterProvider.otherwise('/');
        })
})();