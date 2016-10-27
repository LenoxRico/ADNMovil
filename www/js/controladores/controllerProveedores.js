var adnApp = angular.module('CUENTAS_POR_PAGAR', []);

adnApp.controller('controllerConsultaCuentasPorPagar',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
    $scope.data = [];
  // An elaborate, custom popup
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){});};
  $scope.hide = function(){$ionicLoading.hide().then(function(){}); };

  $scope.Buscar = function(textBusqueda){
  $scope.show();
   if(textBusqueda == undefined){textBusqueda = "";}
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MP-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = textBusqueda+"@#"+$rootScope.idSistema+"@#";
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
                            var ArrayItems = [];    $rootScope.ArrayProveedores = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayProveedores.push(itemArray);
                            }console.log($rootScope.ArrayProveedores);
                            //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                            var rmItem =  $rootScope.ArrayProveedores.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                                  suma.push(rmItem[p][3]);
                                 $scope.sum += parseInt(suma[p]);
                            }
                    }
        });
  }
  $scope.proveedorSeleccionado = function(argUno,argDos,argTres,argCuatro){
    $rootScope.nomCliente =  argDos;
    $rootScope.codProveedor = argUno;
    $rootScope.valProveedor = argTres;
    $rootScope.idProveedor = argCuatro;
    $state.go('app.detalleProveedores');
  }
})