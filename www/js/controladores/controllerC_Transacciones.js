var adnApp = angular.module('CONSULTA_TRANSACCION', []);

adnApp.controller('controllerConsultaTransaccion',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state) {
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
$scope.Buscar = function(textBusqueda,mesSeleccionado){
  $scope.show();
   if(textBusqueda == undefined){textBusqueda = "";}
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MM-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = textBusqueda+"@#"+$rootScope.idSistema+"@#"+$rootScope.idUsuario+"@#"+mesSeleccionado+"@#";
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
                            var ArrayItems = [];    $rootScope.ArrayTransacciones = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayTransacciones.push(itemArray);
                            }
                    }
        });
  }
$scope.valorTrue1 = true;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = false;  
$scope.my = { seleccion: "" };
if($scope.my.seleccion == ""){
      $scope.selected = "Mes Actual ";
      $rootScope.selectFecha=1;
    }
$scope.popFecha1 = function(textBusqueda) {
 $scope.periodos = [
        { title: "Mes Actual", checked: $scope.valorTrue1, value: 1 },
        { title: "Mes Anterior", checked: $scope.valorTrue2, value: 2 },
        { title: "Año Actual", checked: $scope.valorTrue3, value: 3 },
    ];
  var fecha = new Date();$rootScope.selectFecha = "";
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
           console.log(periodoPopup);
          return $scope.my.seleccion; 
        }
      }
    ]
  })
  periodoPopup.then(function(res) {
     switch(res){
      case "":
      $scope.selected= "Mes Actual";
      $rootScope.selectFecha = 1;
      $scope.Buscar(textBusqueda,$rootScope.selectFecha);
$scope.valorTrue1 = true;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = false; 
      break;
      case "Mes Actual":
      $scope.selected= "Mes Actual";
      $rootScope.selectFecha = 1;
      $scope.Buscar(textBusqueda,$rootScope.selectFecha);
$scope.valorTrue1 = true;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = false; 
      break;
      case "Mes Anterior":
      $scope.selected= "Mes Anterior";
      $rootScope.selectFecha = 2;
      $scope.Buscar(textBusqueda,$rootScope.selectFecha);
$scope.valorTrue1 = false;  
$scope.valorTrue2 = true;  
$scope.valorTrue3 = false; 
      break;
      case "Año Actual":
      $scope.selected= "Año Actual";
      $rootScope.selectFecha = 3;
      $scope.Buscar(textBusqueda,$rootScope.selectFecha);
$scope.valorTrue1 = false;  
$scope.valorTrue2 = false;  
$scope.valorTrue3 = true; 
      break;
     }
  });
};

  $rootScope.transaccionSeleccionado = function(argUno,argDos,argTres,argCuatro){
    $rootScope.idCuenta =  argUno;
    $rootScope.codCuenta = argDos;
    $rootScope.nomCuenta = argTres;
    $rootScope.valCuenta = argCuatro;
    $state.go('app.detalleTransacciones');
  }
})