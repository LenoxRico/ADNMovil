var adnApp = angular.module('DETALLE_ARTICULO', []);

adnApp.controller('detalleArticulo', function ($scope,$rootScope,$http,$ionicModal) {
  String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
	    $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MI-02";
        $scope.parametros = $rootScope.codArticulo+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
                      $scope.status = status;          
          			  $scope.resultado = angular.fromJson(data);
          			  $scope.respuesta = $scope.resultado.return.toString(); 
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayDetalleInventario = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayDetalleInventario.push(itemArray);
                            }
                      $rootScope.titulo = "Escoja los artículos";
                    }
        });
$rootScope.existenciasBodega = function (nombre,value){
    $rootScope.nameOpcion =  nombre;
    $rootScope.resOpcion = value;
    if (nombre == 'Exis.S Por Bode'){
      $scope.openModal();
      }
  }
  $ionicModal.fromTemplateUrl('app/modalExistenciaBodega.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
  $scope.modal.show();
      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "EXI_BOD";
        $scope.parametros = ""+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(dataBod, statusBod) {
                      $scope.status = statusBod;          
                  $scope.resultadoBod = angular.fromJson(dataBod);
                  $scope.respuestaBod = $scope.resultadoBod.return.toString(); 
                  console.log($scope.respuestaBod);
                      if($scope.respuestaBod.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                            var arrayobjetsBod = $scope.respuestaBod.split("@#");
                            var ArrayItemsBod = [];    $rootScope.ArrayExistenciaBodega = []; 
                            ArrayItemsBod.push(arrayobjetsBod); 
                            for (var b = 0; b < ArrayItemsBod[0].length; b++) {
                              var itemArrayBod = ArrayItemsBod[0][b].toString().split("|");
                             $rootScope.ArrayExistenciaBodega.push(itemArrayBod);
                            }
                    }
        });
  };
})