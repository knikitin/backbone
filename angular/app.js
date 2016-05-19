( function(){

var app = angular.module('app', ['ui.router']);

app.run(
      [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        }
      ]
    );

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
		function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.hashPrefix("!");

  $stateProvider
    .state('mainState', {
          url: "/{url}",
          templateUrl: "content.html",
          controller: ['$scope', '$http', '$sce', '$stateParams', function($scope, $http, $sce, $stateParams){

			var cContest = this

			$scope.fullContent = {};
			$scope.sce = $sce;
			$scope.showContent = true;

		    if ($stateParams.url === "/") {
		      $scope.fullContent = {};
		      document.location.href='/';
		    } else {
		      $scope.showContent = false;
		      $http.get("/"+$stateParams.url+".json").success(
		        function(data){
		          $scope.fullContent = data;
		          $scope.showContent = true; 
		        }     
		      )
		      .error(function(){
		         $scope.fullContent = {"header":"Ошибка", "content":"Содержимое раздела не обнаружено."};
		         $scope.showContent = true; 
		      });
		    };

          }]
    })
}]);

 
app.controller('mainMenu', [ '$http', '$state', function($http, $state) {
 
  var mainMenu = this

  mainMenu.listMenu = [];
  $http.get("/menu.json").success(function(data){
      mainMenu.listMenu = data;
      $state.go('mainState', {"url":mainMenu.listMenu[1].url});
    });

}]);

})();