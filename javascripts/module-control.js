angular.module('docs', [])

.controller('ModulesCtrl', function($scope, $http) {
  $scope.input = {};
  
  
  $.getJSON('http://npm.dathub.org/api/rows?start=dpd-', function(res){
    $scope.modules = _.filter(res.rows, function(mod){
      return mod.time.modified >= '2013-01-01';
    });
    $scope.$apply();
  })


  $scope.search = function(){
    var searchFor = $scope.input.searchFor;
    var regex = new RegExp(searchFor);
    $scope.modules = [];
    for (var i = 0, ii = $scope.modules.length; i < ii; i++) {
      var mod = $scope.modules[i];
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
