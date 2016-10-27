var adnApp = angular.module('DETALLE_CARTERA', []);

adnApp.controller('detalleCarteracontroller',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
    $scope.data = [];
  // An elaborate, custom popup
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
  $scope.show();
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MC-02";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idCliente+"@#"+$rootScope.nomCliente+"@#";
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
                            var ArrayItems = [];    $rootScope.consulDetalleCartera = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.consulDetalleCartera.push(itemArray);
                            }
                            //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                            var rmItem =  $rootScope.consulDetalleCartera.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                                  suma.push(rmItem[p][3]);
                                 $scope.sum += parseInt(suma[p]);
                            }    
                        
                      }
        });
$rootScope.buscarDetalle = function(){
    $state.go('app.detalleCliente');
  }
 $rootScope.facturaSeleccionado = function(argUno,argDos,argTres,argCuatro,argCinco){
    console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.nomDocumento =  argUno;
    $rootScope.fechaDocumento = argDos;
    $rootScope.diasMora = argTres;
    $rootScope.valorDocumento = argCuatro;
    $rootScope.idDocumento = argCinco;
    $state.go('app.detalleDocumento');
  }
})