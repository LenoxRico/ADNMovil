var adnApp = angular.module('INVENTARIO', []);

adnApp.controller('consultaInventarioController',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state,$ionicHistory,$window){
$scope.data = [];
  
$scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };
$scope.hide = function(){
    $ionicLoading.hide();
  };

$rootScope.BuscarInventario = function(filtroUno,filtroDos){
	$scope.show();
	if(filtroUno != undefined || filtroDos != undefined){
	$rootScope.textBusquedaGrupo = filtroUno;
	$rootScope.textBusquedaArticulo = filtroDos;
	}else {
	$rootScope.textBusquedaGrupo = "";
	$rootScope.textBusquedaArticulo = "";$rootScope.bodega = "";
	}	//consulta para traer el inventario
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MI-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.textBusquedaArticulo+"@#"+$rootScope.idSistema+"@#"+$rootScope.textBusquedaGrupo+"@#"+$rootScope.bodega+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      console.log("Error al cargar los datos.");
                      }else{
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayInventario = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayInventario.push(itemArray);
                            }
        //consulta para traer el total del inventario
	    $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MI-04";
        $scope.parametros = $rootScope.textBusquedaArticulo+"@#"+$rootScope.idSistema+"@#"+$rootScope.textBusquedaGrupo+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(dataTot, status) {
          $scope.status = status;
          $scope.resultadoTotal = angular.fromJson(dataTot);
          $scope.respuestaTotal = $scope.resultadoTotal.return.toString();
                      if($scope.resultadoTotal.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      return $rootScope.error;
                      }else{
                      $scope.hide();
                            var arrayobjets = $scope.respuestaTotal.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayTotalInventario = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayTotalInventario.push(itemArray);
                            }
                      $rootScope.total = $rootScope.ArrayTotalInventario[0].toString();
			}
        });
			}
        });
}
$rootScope.itemSeleccionado = function(cod,ref,nom,exis){
  console.log($rootScope.caso);
  switch ($rootScope.caso) {
    case 1:
        $rootScope.codArticulo = cod;
        $rootScope.refArticulo = ref;
        $rootScope.nomArticulo = nom;
        $state.go('app.detalleArticulo');
      break;
    case 2:
$rootScope.codArticulo = cod;
      $rootScope.refArticulo = ref;
      $rootScope.nomArticulo = nom;
      $rootScope.exisArticulo = exis;
      $rootScope.factArticulo = {id:"",nombre:"",referencia:"",grav:"",idgrav:"",cantidad:"",valoru:"",descuento:"",bodega:"",sTotal:"",existencia:"",tipo:"",negexits:""}
//MF-02
    $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MF-02";
        $scope.parametros = $rootScope.codArticulo+"@#"+$rootScope.bodega+"@#"+$rootScope.lisPrecio+"@#";
        var primerArray = []; var segundoArray= [];$rootScope.respuestaMF_02 = [];
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      }else{                        
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.respuestaMF_02 = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.respuestaMF_02.push(itemArray);
                            } console.log($rootScope.respuestaMF_02);
                            var rmItem =  $rootScope.respuestaMF_02.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                                $rootScope.factArticulo.id = cod;
                                $rootScope.factArticulo.nombre = nom;
                                $rootScope.factArticulo.referencia = ref;
                                $rootScope.factArticulo.bodega = $rootScope.paramsFact.bodega;
                                $rootScope.factArticulo.valoru = $rootScope.respuestaMF_02[p][0];
                                $rootScope.factArticulo.idgrav = $rootScope.respuestaMF_02[p][1];
                                $rootScope.factArticulo.grav = $rootScope.respuestaMF_02[p][2];
                                $rootScope.factArticulo.tipo = $rootScope.respuestaMF_02[p][3];
                                $rootScope.factArticulo.existencia = $rootScope.respuestaMF_02[p][4];
                                $rootScope.factArticulo.negexits = $rootScope.respuestaMF_02[p][5];
                                $scope.data.vlr = Number($rootScope.factArticulo.valoru);
                            }
                    }
        });
$scope.data.cant = 0;$scope.data.desc = 0;
//
                var myPopup = $ionicPopup.show({
                  templateUrl: 'app/templatePopupInventario.html',
                  title: 'Articulo',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancel',type: 'button-dark' },
                    {
                      text: '<b>Aplicar</b>',
                      type: 'button-positive',
                      onTap: function(e) {        
                          if(Number($rootScope.exisArticulo) < Number($scope.data.cant) && $rootScope.modulo != "Pedidos" && $rootScope.factArticulo.negexits != "S" && $rootScope.factArticulo.tipo != "S")
                          {          
                            $rootScope.error = "Existencia Insuficiente";
                            e.preventDefault();
                          }else{ return [$scope.data.vlr,$scope.data.cant,$scope.data.desc];}
                      }
                    }
                  ]
                });
        myPopup.then(function(res) {
              $rootScope.ResInput = [];$rootScope.sum = 0;
             if(res && $scope.data.cant != 0) {
              for(var i = 0;i < res.length;i++){
              $rootScope.ResInput.push(res[i]);               
              } 
            $ionicHistory.goBack();
            $rootScope.factArticulo.valoru = $rootScope.ResInput[0];
            $rootScope.factArticulo.cantidad = $rootScope.ResInput[1];
            $rootScope.factArticulo.descuento = $rootScope.ResInput[2];
            $rootScope.factArticulo.existencia = exis;
            $rootScope.factArticulo.sTotal = $rootScope.ResInput[0] * $rootScope.ResInput[1] * (100-$rootScope.ResInput[2])/100;
            
          $rootScope.listaItemsFacturas.push(angular.fromJson($rootScope.factArticulo));
            for (var p = 0; p < $rootScope.listaItemsFacturas.length; p++) {
            $rootScope.sum += ($rootScope.listaItemsFacturas[p].sTotal);
            };
          $rootScope.factArticulo = {};
          
             } else {
               console.log('You are not sure');
             }
           });
      break;
      }
  }
      
})
