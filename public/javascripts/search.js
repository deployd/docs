angular.module('docs', ['ngSanitize']);

function SearchCtrl($scope, $http, $sanitize) {
  $scope.terms = [];
  $scope.results = [];
  $scope.current = 0;
  
  $('#search form').keydown(function (e) {
    console.log(e.keyCode);
    switch(e.keyCode) {
      case 9: // tab
        e.preventDefault();
        $scope.move();
        $scope.query = $scope.input;
        $scope.search();
        break;
      case 13: // enter
        e.preventDefault();
        $scope.select();
      case 27: // escape
      console.log('select');
        e.preventDefault();
        $scope.deselect();
        break;

      case 38: // up arrow
        e.preventDefault();
        $scope.move('up');
        break;

      case 40: // down arrow
        e.preventDefault();
        $scope.move('down');
        break;
    }
    
    $scope.$apply();
  });
  
  $scope.select = function () {
    $scope.query = $scope.input;
    var current = $scope.terms[$scope.current];
    console.log(current);
    if(current && current.active && current.url) {
      window.location = current.url;
    } else {
      $scope.search();
      $scope.terms = [];      
    }
  }
  
  $scope.deselect = function () {
    $scope.terms = [];
    $scope.current = 0;
  }
  
  $scope.move = function (direction) {
    var terms = $scope.terms;
    var cur = 0;
    
    if(!terms.length) return;
    
    for(var i = 0; i < terms.length; i++) {
      if(terms[i].active) {
        terms[i].active = false;
        cur = i;
        if(direction === 'down') {
          cur++;
        } else if(direction === 'up') {
          cur--;
        }
        break;
      }
    }
    
    if(cur >= terms.length) cur = 0;
    if(cur < 0) cur = terms.length - 1;
    terms[cur].active = true;
    $scope.current = cur;
    $scope.input = terms[cur].value;
  }
  
  $scope.change = function () {
    var q = $scope.input;
    if(q) {
      $http({method: 'GET', url: '/complete/' + q})
        .success(function (data) {
          $scope.terms = data;
        });
    } else {
      $scope.results = [];
      $scope.terms = [];
    }
  }
  
  $scope.search = function () {
    var q = $scope.query;
    $scope.current = 0;
    
    if($scope.query) {
      $http({method: 'GET', url: '/search?q=' + q})
        .success(function (data) {
          $scope.results = data;
        });
    } else {
      $scope.results = [];
      $scope.terms = [];
    }
  }
  
  $scope.foo = '<strong>bar</strong>';
  
}