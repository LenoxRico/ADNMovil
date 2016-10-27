var adnApp = angular.module('REGISTRO_TRANS', []);

adnApp.controller('registroTransaccionesController',function($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicTabsDelegate) {
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
	$rootScope.Buscar = function(textBusqueda){
	$scope.show();
	 if(textBusqueda == undefined){textBusqueda = "";}
	      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MT-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idUsuario+"@#"+$rootScope.idSistema+"@#"+textBusqueda+"@#";
        $http.post($scope.url, {"usuario":$rootScope.usuario,"password":$rootScope.password,"empresa":$rootScope.empresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                      $scope.hide();  
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayRegistro = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayRegistro.push(itemArray);
                            }
                            }
        });
	}

  $scope.registroSeleccionado = function(argUno,argDos,argTres,argCuatro){
  	console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.codRegistro = argUno;
    $rootScope.nomRegistro =  argDos;
    $rootScope.idRegistro = argTres;
    $rootScope.numRegistro = argCuatro;
  
   $scope.show();
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MT-02";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idRegistro+"@#";
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
                            var ArrayItems = [];    $rootScope.ArrayDetalleRegistro = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayDetalleRegistro.push(itemArray);
                            }
                            //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                            var rmItem =  $rootScope.ArrayDetalleRegistro.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                              if(rmItem[p][6] == 'Crédito'){
                                  suma.push(rmItem[p][8]);
                                 $scope.sum += parseInt(suma[p]);
                               }else{
                                  suma.push(rmItem[p][8]);
                                 $scope.sum -= parseInt(suma[p]);
                               }
                            }
                            }
                              });
    $scope.pageFlow.disableOtherTabs = false;
    $ionicTabsDelegate.select(1);
  }
 $scope.detalleRegistroSeleccionado = function(argUno,argDos,argTres,argCuatro,argCinco,argSeis){
    console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro+" / "+argCinco+" / "+argSeis);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.ccoRegistro = argUno;
    $rootScope.ctaRegistro = argDos;
    $rootScope.detRegistro = argTres;
    $rootScope.tipoRegistro = argCuatro;
    $rootScope.vlrRegistro = argCinco;
    $rootScope.terRegistro = argSeis;
    //console.log($rootScope.tipoRegistro);

    //inicio pop up
    var registroPopup = $ionicPopup.show({
    templateUrl: 'app/registroPopup.html',
    scope: $scope,
    buttons: [
      {
        text: 'Cancelar',
        type: 'button-positive button-outline',
        onTap: function(e) { return e; }
      },
      { text: 'Σ =',
        type: 'button-positive',
        onTap: function(e) { return e; }
      },
      {
        text: 'OK',
        type: 'button-positive',
        onTap: function(e) { return e; }
      }
    ]
  })
  registroPopup.then(function(res) {
  
  });
  //fin pop up
  }
    $scope.pageFlow = {disableOtherTabs : true }
})