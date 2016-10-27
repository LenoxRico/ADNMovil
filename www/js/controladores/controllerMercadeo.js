var adnApp = angular.module('CONSULTA_MERCADEO', ['ionic-datepicker']);

adnApp.controller('controllerConsultaMercadeo',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state,$timeout) {
    $scope.data = [];

$scope.currentDate = new Date();
$scope.minDate = new Date(2000, 1, 1);
$scope.maxDate = new Date(2100, 12, 31);
$rootScope.datePickerCallback = function(val) {
$scope.fullmes = val.toString().substr(4,3).toUpperCase();
$scope.mes = val.toString().substr(4,3);
if($scope.mes=='Jan'){$scope.mes='0'+1;}
else if($scope.mes=='Feb'){$scope.mes='0'+2;}
else if($scope.mes=='Mar'){$scope.mes='0'+3;}
else if($scope.mes=='Apr'){$scope.mes='0'+4;}
else if($scope.mes=='May'){$scope.mes='0'+5;}
else if($scope.mes=='Jun'){$scope.mes='0'+6;}
else if($scope.mes=='Jul'){$scope.mes='0'+7;}
else if($scope.mes=='Aug'){$scope.mes='0'+8;}
else if($scope.mes=='Sep'){$scope.mes='0'+9;}
else if($scope.mes=='Oct'){$scope.mes=10;}
else if($scope.mes=='Nov'){$scope.mes=11;}
else {$scope.mes=12;}
$scope.day = val.toString().substr(8,2);
$scope.year = val.toString().substr(11,4);
//fecha concatenada
    $rootScope.fulldate = $scope.day+$scope.mes+$scope.year;
    $rootScope.fullfecha = $scope.day+"-"+$scope.fullmes+"-"+$scope.year;
};
//currentDate por defecto
if($rootScope.fulldate==undefined){
  $scope.val=$scope.currentDate;
  $scope.fullmes = $scope.val.toString().substr(4,3).toUpperCase();
  $scope.mes = $scope.val.toString().substr(4,3);
if($scope.mes=='Jan'){$scope.mes='0'+1;}
else if($scope.mes=='Feb'){$scope.mes='0'+2;}
else if($scope.mes=='Mar'){$scope.mes='0'+3;}
else if($scope.mes=='Apr'){$scope.mes='0'+4;}
else if($scope.mes=='May'){$scope.mes='0'+5;}
else if($scope.mes=='Jun'){$scope.mes='0'+6;}
else if($scope.mes=='Jul'){$scope.mes='0'+7;}
else if($scope.mes=='Aug'){$scope.mes='0'+8;}
else if($scope.mes=='Sep'){$scope.mes='0'+9;}
else if($scope.mes=='Oct'){$scope.mes=10;}
else if($scope.mes=='Nov'){$scope.mes=11;}
else {$scope.mes=12;}
$scope.day = $scope.val.toString().substr(8,2);
$scope.year = $scope.val.toString().substr(11,4);
//fecha concatenada
    $rootScope.fulldate = $scope.day+$scope.mes+$scope.year;
    $rootScope.fullfecha = $scope.day+"-"+$scope.fullmes+"-"+$scope.year;
    console.log($rootScope.fulldate);}

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){});};
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){});};

$rootScope.Buscar = function(textBusqueda){
  $scope.show();
   if(textBusqueda == undefined){textBusqueda = "";}
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CR-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idSistema+"@#"+$scope.fulldate+"@#"+textBusqueda.toUpperCase()+"@#";
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
                            var ArrayItems = [];    $rootScope.ArrayMercadeo = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayMercadeo.push(itemArray);
                            }
                            }
                              });
  }
  $rootScope.mercadeoSeleccionado = function(argUno,argDos,argTres,argCuatro,argCinco){
    console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro+" / "+argCinco);
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.critMercadeo =  argUno;
    $rootScope.nomMercadeo = argDos;
    $rootScope.fechMercadeo = argTres;
    $rootScope.pndMercadeo = argCuatro;
    $rootScope.idMercadeo = argCinco;
    $state.go('app.detalleMercadeo');
  }

  
  })