angular.module('docs', [])

.controller('ModulesCtrl', function($scope, $http) {

  $scope.input = {};

  var allModules = $.map(window.Modules, function(value, index) {
    return value;
  });

  $scope.modules = allModules;


  $scope.search = function(){
    var searchFor = $scope.input.searchFor;
    var regex = new RegExp(searchFor);
    $scope.modules = [];
    for (var i = 0, ii = allModules.length; i < ii; i++) {
      var mod = allModules[i];
      if (regex.test(mod.name) || regex.test(mod.description)) {
        $scope.modules.push(mod);
      }
    }
  }

  $scope.moduleMaintainers = function(module){
    return _.pluck(module.maintainers, 'name').join();
  }

  // auto focus
  $('#searchFor').focus();

});
