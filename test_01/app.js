(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
var menuList = [];
function LunchCheckController($scope) {

$scope.message = '';
$scope.errorMsg = false;

  $scope.checkMenu = function () {
     var dishes, filteredDishes = [];
     var dishesList = $scope.menuList;

     if (!dishesList) {
     	$scope.message = 'Please enter data first!';
     	$scope.errorMsg = true;
     } else {
     	dishes = dishesList.split(",");
     	for (var i = 0; i < dishes.length; i++) {
     		if ((dishes[i] == ' ') || (dishes[i] == '')) {
     			filteredDishes = dishes.splice(i, 1);
     			i--;
     		}
     	}; 
        if(dishes.length) {
        	$scope.errorMsg = false;
	     	if(dishes.length <= 3) {
	     		$scope.message = 'Enjoy!';
	     	} else {
	     		$scope.message = 'Too much!';
	     	}
     	} else {
     		$scope.errorMsg = true;
     		$scope.message = 'Please enter data first!';
     	}
     }
  };
}

})();
