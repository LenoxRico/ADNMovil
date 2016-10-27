var adnApp = angular.module('DETALLE_TRANSACCIONES', []);

adnApp.controller('controllerDetalleMovimientos',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
$rootScope.ArrayDetalleTransacciones = [];
  $scope.my = { seleccion: '' };$scope.myDocu = [{ seleccionDoc: "" }];
if($scope.my.seleccion == ""){
      $scope.selected = "Mes Actual ";
      $rootScope.selectFecha=1;
    }

	$scope.show = function() {
   $rootScope.ArrayDetalleTransacciones = []; 
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){
      detalleTransacciones();
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
    });
  };
  $scope.show();
$rootScope.listDocumentos = function(){
  $rootScope.ArrayDetalleTransacciones = [];
   var listPopup = $ionicPopup.show({
     template: '<ion-list>                                '+
               '<ion-item class="item-checkbox" ng-repeat="item in ArrayTransacciones.slice(0,-1)"> '+
               '<label class="padding checkbox" >'+
               '<input name="seleccion" type="radio" value="{{item}}" ng-model="myDocu.seleccionDoc" />'+
               '</label> {{item[2]}}'+
               '</ion-item>                             '+
               '</ion-list>                               ',
     
     title: 'List',
    scope: $scope,
    buttons: [
      {
        text: '<b>Aplicar</b>',
        type: 'button-positive',
        onTap: function(e) { 
          return angular.fromJson($scope.myDocu.seleccionDoc); 
        }
      }
    ]
  })
  listPopup.then(function(res) {
    console.log(res[0]);
    $rootScope.nomCuenta = res[2];
    $rootScope.idCuenta = res[0];
    detalleTransacciones();
  });
}
$scope.valorTrue1 = true;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = false;  
$scope.popFecha = function(textBusqueda) {
    $scope.periodos = [
        { title: "Mes Actual", checked: $scope.valorTrue1, value: 1 },
        { title: "Mes Anterior", checked: $scope.valorTrue2, value: 2 },
        { title: "Año Actual", checked: $scope.valorTrue3, value: 3 },
    ];
  var fecha = new Date();
  $rootScope.selectFecha = "";
  $rootScope.ArrayDetalleTransacciones = [];
  $rootScope.numDocumentos = 0;
  $scope.val = 0;
  var mesActual = fecha.getMonth()+1;
  var mesAnterior = fecha.getMonth();
  var añoActual = fecha.getFullYear();

  var periodoPopup = $ionicPopup.show({
    title: 'Seleccione el Periodo:',
    templateUrl: 'app/templatePopupMes.html',
    scope: $scope,
    buttons: [
      {
        text: '<b>Aplicar</b>',
        type: 'button-positive',
        onTap: function(e) { 
          return $scope.my.seleccion; 
        }
      }
    ]
  })
  periodoPopup.then(function(res) {
     switch(res){
      case "Mes Actual":
      $scope.selected= "Mes Actual";
      $rootScope.selectFecha = 1;
      detalleTransacciones();
$scope.valorTrue1 = true;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = false; 
      break;
      case "Mes Anterior":
      $scope.selected= "Mes Anterior";
      $rootScope.selectFecha = 2;
      detalleTransacciones();
$scope.valorTrue1 = false;  
$scope.valorTrue2 = true;  
$scope.valorTrue3 = false;  
      break;
      case "Año Actual":
      $scope.selected= "Año Actual";
      $rootScope.selectFecha = 3;
      detalleTransacciones();
$scope.valorTrue1 = false;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = true;
      break;
     }
  });
};

function detalleTransacciones(){
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MM-02";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idCuenta+"@#"+$rootScope.selectFecha+"@#"+$rootScope.idSistema+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }
                      $scope.hide();  
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];$rootScope.ArrayDetalleTransacciones = []; var suma = [];$scope.val = 0 ;
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayDetalleTransacciones.push(itemArray);
                            }
                      $rootScope.numDocumentos = $rootScope.ArrayDetalleTransacciones.slice(0,-1).length;
                            var rmItem =  $rootScope.ArrayDetalleTransacciones.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                                  suma.push(rmItem[p][3]);
                                 $scope.val += parseInt(suma[p]);
                            }
        });
}

 $rootScope.detalleMovimiento = function(argUno,argDos,argTres,argCuatro,argCinco){
    console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.nomDocumento =  argUno;
    $rootScope.fechaDocumento = argDos;
    $rootScope.nomCliente = argTres;
    $rootScope.valorDocumentoCuenta = argCuatro;
    $rootScope.idDocumento = argCinco;
    $state.go('app.detalleDocumento');
  }
})