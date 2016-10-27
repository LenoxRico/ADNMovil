var adnApp = angular.module('CARTERA', []);

adnApp.controller('carteracontroller',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
    $scope.data = [];
	$scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
    });
  };
	$rootScope.Buscar = function(textBusqueda){
	$scope.show();
	 if(textBusqueda == undefined){textBusqueda = "";}
	      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MC-01";
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
                            var ArrayItems = [];    $rootScope.ArrayCartera = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayCartera.push(itemArray);
                            }
                            //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                            var rmItem =  $rootScope.ArrayCartera.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                                  suma.push(rmItem[p][3]);
                                 $scope.sum += parseInt(suma[p]);
                            }
                            }
                              });
	}
  $scope.itemSeleccionado = function(argUno,argDos,argTres,argCuatro){
  	//console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.nomCliente =  argDos;
    $rootScope.codCliente = argUno;
    $rootScope.valCliente = argTres;
    $rootScope.idCliente = argCuatro;
    $state.go('app.detalleCartera');
  }
})