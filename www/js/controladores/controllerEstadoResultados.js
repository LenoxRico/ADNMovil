var adnApp = angular.module('ESTADO_RESULTADOS', []);

adnApp.controller('controllerEstadoResultados',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state,$timeout) {
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
$scope.Buscar = function(textBusqueda,mesSeleccionado){
  $scope.show();
  $scope.sum = 0 ;
   if(textBusqueda == undefined){textBusqueda = "";}
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MU-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = textBusqueda+"@#"+$rootScope.idSistema+"@#"+mesSeleccionado+"@#";
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
                        var ArrayItems = [];    $rootScope.ArrayEstadoResul = []; 
                        ArrayItems.push(arrayobjets); var suma = [];
                        for (var i = 0; i < ArrayItems[0].length; i++) {
                          var itemArray = ArrayItems[0][i].toString().split("|");
                         $rootScope.ArrayEstadoResul.push(itemArray);
                        }
                        var rmItem =  $rootScope.ArrayEstadoResul.slice(0, -1);
                        for (var p = 0; p < rmItem.length; p++) {
                             /* suma.push(rmItem[p][2]);
                             $scope.sum += parseInt(suma[p]);*/
                              switch(rmItem[p][0]){
                                case "4":
                                  $scope.sum += parseFloat(rmItem[p][2]);
                                  break;
                                case "5":
                                  $scope.sum += parseFloat(rmItem[p][2]);
                                  break;
                                case "6":
                                  $scope.sum += parseFloat(rmItem[p][2]);
                                  break;
                                case "7":
                                  $scope.sum += parseFloat(rmItem[p][2]);
                                  break;
                              }
                              
                        }
                        console.log($scope.sum*-1);
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
  $scope.cuentaSeleccionado = function(argUno,argDos,argTres){
    console.log(argUno+" / "+argDos+" / "+argTres);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.codCuenta =  argUno;
    $rootScope.nomCuenta = argDos;
    $rootScope.valCuenta = argTres;
    $state.go('app.auxiliar');
  }
  })
