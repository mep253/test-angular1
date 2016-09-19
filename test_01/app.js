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
     var dishes;
     var dishesList = $scope.menuList;
     if (!dishesList) {
     	$scope.message = 'Please enter data first!';
     	$scope.errorMsg = true;
     } else {
     	dishes = dishesList.split(",");
        $scope.errorMsg = false;

     	if(dishes.length <= 3) {
     		$scope.message = 'Enjoy!';
     	} else {
     		$scope.message = 'Too much!';
     	}
     }
  };
}

})();
