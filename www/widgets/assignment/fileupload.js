app.directive('fileUpload', [
  '$timeout',
function (
  $timeout
){
    return {
        link: function (scope, element, attrs) {
            element.on('change', function  (evt) {
                var files = evt.target.files;
                var fileString = "";
                for (i = 0; i < files.length; i++){
                    fileString += files[i].name + ", "
                }
                element.parent().parent().next().val(fileString.substring(0, fileString.length - 2));
            });


        }
    }
}]);
