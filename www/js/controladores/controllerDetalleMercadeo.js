var adnApp = angular.module('DETALLE_MERCADEO', []);

adnApp.controller('controllerDetalleMercadeo',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
    $scope.data = [];

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };
$rootScope.agregarTarea = function(){
    $state.go('app.agregarTarea');
  }
  $rootScope.detMercadeo = [];
$rootScope.objMercadeo = {fch:"",tar:""};
 $scope.show();
       $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CR-02";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idMercadeo+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                            $scope.hide();
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayDetalleMercadeo = [];
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayDetalleMercadeo.push(itemArray);
                            }
                            var items = $rootScope.ArrayDetalleMercadeo.slice(0,-1);
                            for (var i = 0; i < items.length; i++) {
                              $rootScope.objMercadeo.fch = items[i][0];
                              $rootScope.objMercadeo.tar = items[i][1];
                              $rootScope.detMercadeo.push(angular.fromJson($rootScope.objMercadeo));
                              $rootScope.objMercadeo = {};
                            }console.log($rootScope.detMercadeo);
                            }
              });
})