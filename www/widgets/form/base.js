app.directive('formBase', [
  "settings",
  "Item",
  function(
    settings,
    Item
  ) {

    return {
      templateUrl: settings.widgets + 'form/base.html',
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

        scope.newItem = {};

        scope.save = function() {
          // save to DB, then notify subscribers of new item
          Item.create(scope.newItem, function(newItem) {
            // "synthetic" event broadcaster
            scope.$broadcast('newItem', newItem);

            // finally, reset form model
            scope.newItem = {};
            // and make form "untouched"
            scope.newItemForm.$setUntouched();
          });
        };
      }
    };
  }
]);