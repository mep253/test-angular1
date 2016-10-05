(function () {
'use strict';

angular.module('myApp', [])
.controller('toBuyListController', toBuyListController)
.controller('boughtListController', boughtListController)
.service('ShoppingListService', ShoppingListService);

toBuyListController.$inject = ['$scope','ShoppingListService'];
function toBuyListController($scope, ShoppingListService) {
    var tbl = this;

    tbl.items = ShoppingListService.getItems();

    tbl.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
        //console.log(tbl.items.length);
    };
    tbl.addItem = function (itemName, quantity) {
        ShoppingListService.addItem(itemName, quantity);
        //console.log(tbl.boughtItems.length);
    };
}

boughtListController.$inject = ['$scope','ShoppingListService'];
function boughtListController($scope, ShoppingListService) {
    var bl = this;

    bl.BougthItems = ShoppingListService.getBougthItems();

}
function ShoppingListService() {
    var service = this;

    // List of shopping items
    var items = [
                    {
          name: 'Milk',
          quantity: "1"
        },
        {
          name: 'Sugar',
          quantity: "1"
        },
        {
          name: 'Bread',
          quantity: "2"
        },
        {
          name: 'Eggs',
          quantity: "10"
        },
        {
          name: 'Cheese',
          quantity: "1"
        }
    ];
    var boughtItems = [];  

    service.addItem = function (itemName, quantity) {
        var item = {
            name: itemName,
            quantity: quantity
        };
        boughtItems.push(item);
        console.log(boughtItems);
    };

    service.removeItem = function (itemIdex) {
        items.splice(itemIdex, 1);
    };

    service.getItems = function () {
        return items;
    };
    service.getBougthItems = function () {
        return boughtItems;
    };
}

})();
