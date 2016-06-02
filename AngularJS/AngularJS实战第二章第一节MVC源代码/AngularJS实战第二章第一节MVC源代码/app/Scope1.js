function GreetCtrl($scope, $rootScope) {
	$scope.name = '李子';
	$rootScope.department = 'Angular';
}

function ListCtrl($scope) {
	$scope.names = ['小明', '小黄', '小王'];
}
