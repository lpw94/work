var myModule = angular.module('MyModule', ['ui.bootstrap']);
myModule.controller('AccordionDemoCtrl', ['$scope',
    function($scope) {

        $scope.oneAtATime = true;

        $scope.groups = [{
            title: '标题 - 1',
            content: '标题内容 - 1'
        }, {
            title: '标题 - 2',
            content: '标题内容 - 2'
        }];

        $scope.items = ['儿子 1', '儿子 2', '儿子 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('儿子 ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
])
