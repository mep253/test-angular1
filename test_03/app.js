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
      // title: '@title'
    }
  };

  return ddo;
};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    

    menu.searchMenu = function(searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

        promise.then(function (response) {
            menu.found = response;
            if(!menu.found.length || !searchTerm){
                menu.error = true;
            } else {
                menu.error = false;
            }
            console.log('menu.found: ', menu.found);
            console.log('response: ', response);
            console.log('response.data: ', response.data);
            
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });

    menu.removeItem = function (itemIndex) {
    // shoppingList.removeItem(itemIndex);
    // menu.title = origTitle + " (" + menu.items.length + " items )";
    menu.found.splice(itemIndex, 1);
  };
    

    }


    // menu.logMenuItems = function (searchTerm) {
    //     var promise = MenuSearchService.getMenuForCategory(shortName);

    //     promise.then(function (response) {
    //       console.log(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    // };

}
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;

    // method: getMatchedMenuItems(searchTerm).  
    // Once it gets all the menu items, 
    // it should loop through them to pick out the ones whose description matches the searchTerm. 
    // Once a list of found items is compiled, it should return that list (wrapped in a promise).
    //  Remember that the then function itself returns a promise. 
    // https://davids-restaurant.herokuapp.com/menu_items.json

    //reaching out to the server
    //retrieve the list of all the menu items.

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
            console.log('filtered is: ', filtered);
            console.log('filtered.length: ', filtered.length);
            return filtered;
        });
    };



    }

})();
