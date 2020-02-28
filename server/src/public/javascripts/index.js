angular.module('Snow', ['ngRoute', 'ngResource'])
	.controller('AppsOptsCtrl', function ($scope, $http) {

		$scope.title = 'ngServiceNow';
		$scope.url = 'http://localhost:3000/table';
		$scope.data = [];
		$scope.errorMsg = '';

		$http.get($scope.url).then(function successCb(response) {

			$scope.data = [];
			$scope.errorMsg = 'No Error(s) Found';

			console.log('ServiceNow Response: ', response);
			if (response.status === 200 && response.data && response.data.result) {
				console.log(response.status);
				$scope.data = response.data.result;
			}
		}, function errorCb(response) {
			console.log('Error Response:', response);
			$scope.errorMsg = `Error Status: ${response.status}: ${response.data}`;
		});
	});