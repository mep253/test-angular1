(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);


function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      menu: '=foundList',
      removeItem: '&'
    }
  };

  return ddo;
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    

    menu.searchMenu = function(searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems((menu.searchTerm).toLowerCase());

        promise.then(function (response) {
            menu.found = response;
            if(!menu.found.length || !searchTerm){
                menu.error = true;
            } else {
                menu.error = false;
            }
            // console.log('menu.found: ', menu.found);
            // console.log('response: ', response);
            // console.log('response.data: ', response.data);
            
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    }
    menu.removeItem = function (itemIndex) {
        menu.found.splice(itemIndex, 1);
    };

}
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        var foundItems = [];
        var filtered = [];

       return $http({
            method: "GET",
            url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        }).then(function (result) {
            foundItems = result.data;
             //console.log(foundItems.menu_items.length);
         
            for (var i = 0; i < foundItems.menu_items.length; i++) {
                    var desc = foundItems.menu_items[i].description;
                    if(desc.indexOf(searchTerm) !== -1) 
                        filtered.push(foundItems.menu_items[i]);
                };
            // console.log('filtered is: ', filtered);
            // console.log('filtered.length: ', filtered.length);
            return filtered;
        });
    };
}

})();
