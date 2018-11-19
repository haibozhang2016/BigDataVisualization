
var myApp = angular.module("app1",[])
myApp.controller("HelloAngular",['$scope',
	function($scope){
		$scope.greeting = {
			text: 'hello'
		}
	}]
)

