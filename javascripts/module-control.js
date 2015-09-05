angular.module('docs', [])

.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])

.controller('ModulesCtrl', function($scope, $http) {
  $scope.input = {};

  var allMoudles = [];

  var fields = ['name','keywords','rating','description','author','modified','homepage','version', 'maintainers']
  $http.get('http://npmsearch.com/query', {
    params: {
      "default_field": "name",
      "analyze_wildcard": true,
      "q": "name:dpd-*",
      "fields": fields.join(','),
      start: 0,
      size: 1000,
      sort: 'rating:desc'
    },
  })
  .then(function(response){
    // console.log(response.data)
    var results = response.data.results
    $scope.modules = allMoudles = _(results)
    .map(function(data){
      fields.forEach(function(k){
        if (k === 'keywords' || k === 'maintainers') return;
        if (!Array.isArray(data[k])) return;
        data[k] = data[k][0];
      });
      return data;
    })
    .filter(function(result){
      return result.modified >= '2013-01-01';
    }).value()
    $scope.$apply()
  })


  $scope.search = function(){
    var searchFor = $scope.input.searchFor;
    var regex = new RegExp(searchFor);
    $scope.modules = [];
    for (var i = 0, ii = allMoudles.length; i < ii; i++) {
      var mod = allMoudles[i];
      if (regex.test(mod.name) || regex.test(mod.description)) {
        $scope.modules.push(mod);
      }
    }
  }

  // auto focus
  $('#searchFor').focus();

});
