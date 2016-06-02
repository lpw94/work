var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'E',
        template: '<h1>嗨！大家好</h1>',
        replace: true
    }
});
