app.directive('itemList', [
  "settings",
  "Item",
  function(
    settings,
    Item
  ) {

    return {
      templateUrl: settings.widgets + 'item/list.html',
      link: function(scope, element, attrs) {

        /*
          Item
            .create()
            .show()
            .index()
            .update()
            .remove();

          new Item()
            .$create()
            .$show()
            .$index()
            .$update()
            .$remove();
        */
        
        scope.items = Item.get();

        // "synthetic" event subscriber
        scope.$on('newItem', function() {
          scope.items = Item.get();
        });
      }
    };
  }
]);