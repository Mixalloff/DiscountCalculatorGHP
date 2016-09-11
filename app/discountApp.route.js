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
