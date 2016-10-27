var adnApp = angular.module('AGREGAR_TAREA', ['ionic-timepicker']);

adnApp.controller('controllerAgregarTarea',function($scope,$rootScope,$http,$ionicLoading,$ionicPopup,$state,ionicTimePicker) {
    $scope.data = [];
    if($rootScope.showHora == undefined || $rootScope.fulltime == undefined){
      $scope.currentTime = new Date();
      $rootScope.fullhora = $scope.currentTime.toString().substr(16,2)+$scope.currentTime.toString().substr(19,2);
      $rootScope.showHora = $scope.currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      $rootScope.fulltime = $rootScope.fulldate+$rootScope.fullhora;
    }
$scope.currentDate = new Date();
$scope.minDate = new Date(2000, 1, 1);
$scope.maxDate = new Date(2100, 12, 31);

$scope.datePicker = function(val) {
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
    $rootScope.fulltime = $rootScope.fulldate+$rootScope.fullhora;
};
     $rootScope.selectTime = function(){
     var ipObj1 = {
     callback: function (val) {
        var selectedTime = new Date(val * 1000);
        $rootScope.selectHour = selectedTime.getUTCHours();
        $rootScope.selectMinute = selectedTime.getUTCMinutes();
              if($rootScope.selectHour.toString()>12){
                $rootScope.showHora = ($rootScope.selectHour-12).toString()+":"+$rootScope.selectMinute.toString()+" PM";
              }else if($rootScope.selectHour.toString()<10){
                $rootScope.selectHour = "0"+selectedTime.getUTCHours();
                $rootScope.showHora = $rootScope.selectHour.toString()+":"+$rootScope.selectMinute.toString()+" AM";
              }else{$rootScope.showHora = $rootScope.selectHour.toString()+":"+$rootScope.selectMinute.toString()+" AM";}
        $rootScope.fullhora = $rootScope.selectHour.toString()+$rootScope.selectMinute.toString();
        $rootScope.fulltime = $rootScope.fulldate+$rootScope.fullhora;
       },
        format: 12,             //Formato 12 hrs
        step: 1,                //Paso a Paso del Minutero
        setLabel: 'Aplicar',    //Boton Aplicar
        closeLabel: 'Cancelar'
        };
        ionicTimePicker.openTimePicker(ipObj1);
      }


	$scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }).then(function(){ });};
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){});};

  $rootScope.cancelarTarea = function(){
    $state.go('app.detalleMercadeo');
  }

  $scope.currentDate = new Date();
  $scope.minDate = new Date(2000, 1, 1);
  $scope.maxDate = new Date(2100, 12, 31);
 
  $rootScope.datePickerCallback;

  $rootScope.Grabar = function(textBusqueda, alertPopup){
  $scope.show();
  if(textBusqueda == undefined){ var busqueda = "";}else{ var busqueda = textBusqueda;}
  $rootScope.cadena = "<doc:"+$rootScope.idMercadeo+">";
  $rootScope.cadena += "<fch:"+$rootScope.fulltime+">";
  $rootScope.cadena += "<tar:"+busqueda+">";
  $rootScope.cadena +="</doc:"+$rootScope.idMercadeo+">";
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CR-04";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.cadena+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
              if($scope.respuesta.toString() == "OK@#"){
                    $scope.hide();
                    $scope.arrayText = {fch:"Tarea "+$rootScope.fullfecha,tar:textBusqueda.toUpperCase()};
                    $rootScope.detMercadeo.push(angular.fromJson($scope.arrayText));
                    //$rootScope.ArrayDetalleMercadeo.push($scope.arrayText);
                    var mensaje = "Tarea Exitosa.";
                    $scope.showAlert("Mensaje",mensaje);
                }else{
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,$scope.respuesta.toString());
                }
                 });
               // }
  }
 $scope.showAlert = function(nomModulo,ok_error) {
   var alertPopup = $ionicPopup.alert({
     title: nomModulo,
     template: ok_error
   });
  if(nomModulo == "Error"){}else{
  return alertPopup.then(function(res) {
      console.log($scope.arrayText);
      $scope.arrayText = {};
      $state.go('app.detalleMercadeo');
   });
 }
}
var hideKeyboard = function() {
    document.activeElement.blur();
    $("input").blur();
};
})