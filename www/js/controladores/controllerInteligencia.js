var adnApp = angular.module('INTELIGENCIA', []);

adnApp.controller('controllerInteligencia',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
    $scope.data = [];
  // An elaborate, custom popup
	$scope.show = function() {
    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'}).then(function(){ });
  };
  $scope.hide = function(){$ionicLoading.hide().then(function(){ });};
	$scope.Buscar = function(textBusqueda){
	$scope.show();
	 if(textBusqueda == undefined){textBusqueda = "";}
	      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MC-04";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idSistema+"@#"+textBusqueda+"@#";
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
                      var ArrayItems = [];    $rootScope.ArrayDimension = []; 
                      ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                      for (var i = 0; i < ArrayItems[0].length; i++) {
                        var itemArray = ArrayItems[0][i].toString().split("|");
                       $rootScope.ArrayDimension.push(itemArray);
                      }console.log($rootScope.ArrayDimension);

                    }
        });
	}
  $scope.dimensionSeleccionado = function(argUno,argDos,argTres,argCuatro,argCinco){
  	console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro+" / "+argCinco);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.idDimension =  argUno;
    $rootScope.idRubro = argDos;
    $rootScope.codDimension = argTres;
    $rootScope.nomDimension = argCuatro;
    $rootScope.valDimension = argCinco;
    $state.go('app.detalleInteligencia');
  }
})