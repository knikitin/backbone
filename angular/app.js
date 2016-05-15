( function(){

var app = angular.module('app', []);
 
app.controller('mainMenu', [ '$http', '$sce', function($http, $sce) {
  
  var mainMenu = this

  mainMenu.fullContent = {};
  mainMenu.sce = $sce;
  mainMenu.showContent = true;

  mainMenu.listMenu = [];
  $http.get("/menu.json").success(function(data){
      mainMenu.listMenu = data;
      mainMenu.openUrl(mainMenu.listMenu[1].url);
    });

  mainMenu.openUrl = function(setCurrent) {
    mainMenu.currentUrl = setCurrent;
    if (setCurrent === "/") {
      mainMenu.fullContent = {};
      document.location.href='/';
    } else {
      mainMenu.showContent = false;
      $http.get("/"+setCurrent+".json").success(
        function(data){
         mainMenu.fullContent = data;
          mainMenu.showContent = true; 
        }     
      )
      .error(function(){
         mainMenu.fullContent = {"header":"Ошибка", "content":"Содержимое раздела не обнаружено."};
         mainMenu.showContent = true; 
      });
    };
  };
  
  mainMenu.isActiv = function(testCurrent){
    return testCurrent === mainMenu.currentUrl;
  };

}]);

})();