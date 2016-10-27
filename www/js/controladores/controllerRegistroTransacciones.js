var adnApp = angular.module('REGISTRO_TRANSACCIONES', []);

adnApp.controller('registroTransaccionesController',function($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$ionicTabsDelegate) {
    $scope.data = [];
    $scope.dato = [];
    $rootScope.ItenPlantilla = { idCuenta:"",
                                    idCco:"",
                                   codCco:"",
                                idTercero:"",
                                codCuenta:"",
                                nomCuenta:"",
                               debe_haber:"",
                                  detalle:"",
                                    valor:"",
                               nitTercero:"",
                                 nomCorto:"",
                                posicion:""
                              };
  $rootScope.ArrayListaPlantilla = [];
  $scope.activarDet = true;
	$scope.show = function() {
    $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'}).then(function(){});};
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){});};
	$scope.Buscar = function(textBusqueda){
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
                            var ArrayItems = [];    $rootScope.ArrayRegistroTransacciones = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayRegistroTransacciones.push(itemArray);
                            }console.log($rootScope.ArrayRegistroTransacciones);
                            }
        });
	}

  $scope.registroSeleccionado = function(argUno,argDos,argTres,argCuatro){
  	console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro);
    $rootScope.idRegistro = argDos;
    $rootScope.codRegistro = argUno;
    $rootScope.nomRegistro =  argCuatro;
    $rootScope.numRegistro = argTres;
    $scope.show();
    $scope.detallePlantilla();
    $ionicTabsDelegate.select(1);
    $scope.activarDet = false;
  }
 $scope.total;
  $scope.detallePlantilla = function(){
    $scope.total = 0;
     $scope.total = 0;
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
                            }console.log($rootScope.ArrayDetalleRegistro);
                            //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                            var rmItem =  $rootScope.ArrayDetalleRegistro.slice(0, -1);
                            for (var p = 0; p < rmItem.length; p++) {
                              $rootScope.ItenPlantilla.idCuenta = rmItem[p][0];
                              $rootScope.ItenPlantilla.idCco = rmItem[p][1];
                              $rootScope.ItenPlantilla.codCco = rmItem[p][2];
                              $rootScope.ItenPlantilla.idTercero = rmItem[p][3];
                              $rootScope.ItenPlantilla.codCuenta = rmItem[p][4];
                              $rootScope.ItenPlantilla.nomCuenta = rmItem[p][5];
                              $rootScope.ItenPlantilla.debe_haber = rmItem[p][6];
                              $rootScope.ItenPlantilla.detalle = rmItem[p][7];
                              $rootScope.ItenPlantilla.valor = rmItem[p][8];
                              $rootScope.ItenPlantilla.nitTercero = rmItem[p][9];
                              $rootScope.ItenPlantilla.nomCorto = rmItem[p][10];
                              $rootScope.ItenPlantilla.posicion = p;
                              $rootScope.ArrayListaPlantilla.push(angular.fromJson($rootScope.ItenPlantilla));
                              $rootScope.ItenPlantilla = {}
                            }
                            }
                              });
  }

$scope.detalleRegistroSeleccionado = function(itemPlantilla,SI_NO){
  console.log(itemPlantilla,SI_NO);
  $rootScope.posicion = itemPlantilla.posicion;
  $rootScope.debCre = itemPlantilla.debe_haber;
if(SI_NO == "NO"){  
  $rootScope.debCre = itemPlantilla.debe_haber;
  $scope.dato.nomPlantilla = itemPlantilla.nomCuenta;
  $scope.dato.cuenta = itemPlantilla.codCuenta;
  $scope.dato.cco = itemPlantilla.codCco;
  $scope.dato.nit = itemPlantilla.nitTercero;
  $scope.dato.valor = itemPlantilla.valor;
  $scope.actualizarRegistro($scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit);
  if(itemPlantilla.debe_haber == "Débito"){
    $scope.dato.Debito = true;$scope.dato.Credito = false;
  }else{
    $scope.dato.Credito = true;$scope.dato.Debito = false;
  }
  console.log(itemPlantilla.debe_haber);
}else{
  $scope.dato.nomPlantilla = "";
  $scope.dato.cuenta = "";
  $scope.dato.cco = "";
  $scope.dato.nit = "";
  $scope.dato.valor = "";
  $rootScope.d_c = "Débito";
  $scope.dato.Debito = true;
  $scope.dato.Credito = false;
}

    var registroPopup = $ionicPopup.show({
    templateUrl: 'app/templatePopupRegsitroTransaccion.html',
    cssClass: 'custom-class',
    scope: $scope,
    buttons: [
      {
        text: 'Cancelar',
        type: 'button-positive button-small',
        onTap: function(e) { 
              return ["","","","","","","","cancelar"]; 
                           }
      },
      { text: 'Sumas iguales',
        type: 'button-positive button-small',
        onTap: function(e) {
              if ($rootScope.error.length > 0) {
                e.preventDefault();
              }else { 
              return [$scope.dato.nomPlantilla,$scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit,$scope.dato.valor,$scope.dato.Debito,$scope.dato.Credito,"sumas"]; 
                    }
              }
      },
      {
        text: 'Actualizar',
        type: 'button-positive button-small',
        onTap: function(e) { 
              if ($rootScope.error.length > 0) {
                e.preventDefault();
              }else { 
              return [$scope.dato.nomPlantilla,$scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit,$scope.dato.valor,$scope.dato.Debito,$scope.dato.Credito,"update"]; 
              }
            }
      }
    ]
  })
  registroPopup.then(function(res) {

  for (var i = 0; i < res.length; i++) {
    var tipo = res[7];
  }
          switch(tipo){
            case "cancelar":
              
              break;
            case "sumas":
              $scope.sumasIguales(itemPlantilla.valor,$rootScope.debCre);

              break;
            case "update":
              $scope.actualizarRegistro($scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit);
              $scope.valores();
              //$scope.totalDoc();
              if($scope.dato.cuenta != itemPlantilla.codCuenta){
                $scope.agregar();
              }
              //
              break;
            }
  });
}
$scope.debi_credi = function(debito_credito){
          switch(debito_credito){
            case "Debito":$scope.dato.Debito = true;$scope.dato.Credito = false;
              break;
            case "Credito":$scope.dato.Credito = true;$scope.dato.Debito = false;
                $rootScope.d_c = "Crédito";
              break;
            }
}
var strdate = new Date();
var year = strdate.getFullYear();
$scope.actualizarRegistro = function(cuenta,nit,cco){
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MT-03";
        $scope.parametros = cuenta+"@#"+cco+"@#"+nit+"@#"+year+"@#"+$rootScope.idSistema+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
          console.log($scope.respuesta);
                      if($scope.respuesta.toString().indexOf("CUENTA NO EXISTE") == 0 || $scope.respuesta.toString().indexOf("NECESITA CUENTA DE DETALLE") == 0 || $scope.respuesta.toString().indexOf("MANEJA FECHA VENCIMIENTO") == 0){
                        var errorArray = $scope.respuesta.split("|");
                      $rootScope.error = errorArray[0];
                      }else{
                        $rootScope.error = "";
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayActualizarRegistro = []; 
                            ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayActualizarRegistro.push(itemArray);
                            }
  var updateItem = $rootScope.ArrayActualizarRegistro.slice(0,-1);
  for (var i = 0; i < updateItem.length; i++) {
    $rootScope.idcuenta = updateItem[i][1];
    $rootScope.idtercero = updateItem[i][3];
    $rootScope.nomtercero = updateItem[i][4];
    $rootScope.idcco = updateItem[i][5];
  }
  for (var i = 0; i < $rootScope.ArrayListaPlantilla.length; i++) {
    if($rootScope.ArrayListaPlantilla[i].posicion == $rootScope.posicion){
      $rootScope.ArrayListaPlantilla[i].idCuenta   = $rootScope.idcuenta;
      $rootScope.ArrayListaPlantilla[i].codCuenta  = $scope.dato.cuenta;
      $rootScope.ArrayListaPlantilla[i].nomCuenta  = $scope.dato.nomPlantilla;
      $rootScope.ArrayListaPlantilla[i].debe_haber = $rootScope.d_c;
      $rootScope.ArrayListaPlantilla[i].codCco     = $scope.dato.cco;
      $rootScope.ArrayListaPlantilla[i].idCco      = $rootScope.idcco;
      $rootScope.ArrayListaPlantilla[i].idTercero  = $rootScope.idtercero;
      $rootScope.ArrayListaPlantilla[i].nitTercero = $scope.dato.nit;
      $rootScope.ArrayListaPlantilla[i].nomCorto   = $rootScope.nomtercero;
      $rootScope.ArrayListaPlantilla[i].valor      = $scope.dato.valor;
      }
    }
                            }
                            $scope.totalDoc();
                              });
}
$scope.sumasIguales = function(valor,debCredi){
  console.log(valor,debCredi);
  var difSum = valor; 
  if(debCredi == "Crédito"){ difSum = difSum*-1; console.log(difSum);}
  difSum = difSum-$scope.total;
  if(difSum > 0){
    $scope.dato.Debito = true;
    $rootScope.d_c = "Débito";
  }else{
    $scope.dato.Credito = true;
    $rootScope.d_c = "Crédito";
    difSum = difSum*-1;
  }
  $scope.dato.valor = difSum;
  $scope.actualizarRegistro($scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit);
}
$rootScope.SumD = 0;
$scope.totalDoc = function(){
$scope.total = 0;
var rmItem =  $rootScope.ArrayDetalleRegistro.slice(0, -1);
for (var i = 0; i < $rootScope.ArrayListaPlantilla.length; i++) {
      if($rootScope.ArrayListaPlantilla[i].debe_haber == "Débito"){
        $scope.total += parseFloat($rootScope.ArrayListaPlantilla[i].valor);
        console.log($rootScope.ArrayListaPlantilla[i].valor);
      }else {
        $scope.total -= parseFloat($rootScope.ArrayListaPlantilla[i].valor);
        console.log($rootScope.ArrayListaPlantilla[i].valor);
      }
        }
        $rootScope.SumD = $scope.total;
}
$scope.valores = function(){
for (var i = 0; i < $rootScope.ArrayListaPlantilla.length; i++) {
  if($rootScope.ArrayListaPlantilla[i].posicion == $rootScope.posicion){
    $rootScope.ArrayListaPlantilla[i].idCuenta   = $rootScope.idcuenta;
    $rootScope.ArrayListaPlantilla[i].codCuenta  = $scope.dato.cuenta;
    $rootScope.ArrayListaPlantilla[i].nomCuenta  = $scope.dato.nomPlantilla;
    $rootScope.ArrayListaPlantilla[i].codCco     = $scope.dato.cco;
    $rootScope.ArrayListaPlantilla[i].idCco      = $rootScope.idcco;
    $rootScope.ArrayListaPlantilla[i].idTercero  = $rootScope.idtercero;
    $rootScope.ArrayListaPlantilla[i].nitTercero = $scope.dato.nit;
    $rootScope.ArrayListaPlantilla[i].nomCorto   = $rootScope.nomtercero;
    $rootScope.ArrayListaPlantilla[i].valor      = $scope.dato.valor;
    $scope.actualizarRegistro($rootScope.ArrayListaPlantilla[i].codCuenta,$rootScope.ArrayListaPlantilla[i].codCco,$rootScope.ArrayListaPlantilla[i].nitTercero);
  }
  }
if($scope.dato.cuenta != "" || $scope.dato.cco != "" || $scope.dato.nit != "" || $scope.dato.valor != "" ){
  $scope.actualizarRegistro($scope.dato.cuenta,$scope.dato.cco,$scope.dato.nit);
}
}
$scope.agregar = function(){
  console.log($rootScope.posicion);
      $rootScope.ItenPlantilla.idCuenta = $rootScope.idcuenta;
      $rootScope.ItenPlantilla.idCco = $rootScope.idcco;
      $rootScope.ItenPlantilla.codCco = $scope.dato.cco;
      $rootScope.ItenPlantilla.idTercero = $rootScope.idtercero;
      $rootScope.ItenPlantilla.codCuenta = $scope.dato.cuenta;
      $rootScope.ItenPlantilla.nomCuenta = $scope.dato.nomPlantilla;
      $rootScope.ItenPlantilla.debe_haber = $rootScope.d_c;
      $rootScope.ItenPlantilla.detalle = "";
      $rootScope.ItenPlantilla.valor = $scope.dato.valor;
      $rootScope.ItenPlantilla.nitTercero = $scope.dato.nit;
      $rootScope.ItenPlantilla.nomCorto = $rootScope.nomtercero;
      $rootScope.ItenPlantilla.posicion = 10;
      $rootScope.ArrayListaPlantilla.push(angular.fromJson($rootScope.ItenPlantilla));
      $rootScope.ItenPlantilla = {}

}
var signo = "";
$scope.grabar = function(){
 $scope.show();
var Cadena ;var strdate = new Date();
var dia; var mes ;var year = strdate.getFullYear();
var hora ;var min;
      if(strdate.getDate() < 10){
        dia = "0"+strdate.getDate();
      }else{
        dia = strdate.getDate();
      }
      if(strdate.getMonth()+1 < 10){
        mes = "0"+ (strdate.getMonth()+1);
      }else{
        mes = strdate.getMonth()+1;
      }
      if(strdate.getHours() < 10){
        hora = "0"+ strdate.getHours();
      }else {
        hora = strdate.getHours();
      }
      
      if(strdate.getMinutes() < 10){
        min = "0"+strdate.getMinutes();
      }else{
        min = strdate.getMinutes();
      }

      Cadena  = "<doc:"+ $rootScope.idUsuario +"><enc>";
      Cadena += "<tdc:"+ $rootScope.codRegistro +">";
      Cadena += "<sis:"+ $rootScope.idSistema +">";
      Cadena += "<usr:"+ $rootScope.idUsuario +">";
      Cadena += "<fch:"+ dia+mes+year+hora+min +">";
      Cadena += "</enc>";
      
      var cont = 0;
      for (var i = 0; i < $rootScope.ArrayListaPlantilla.length; i++) {
        console.log($rootScope.ArrayDocumentos);
        if(Number($rootScope.ArrayListaPlantilla[i].valor) != 0){
          cont ++;
        if($rootScope.ArrayListaPlantilla[i].debe_haber == "Débito"){signo="";}else{signo="-";}
        Cadena += "<itm:"+cont+">";
        Cadena += "<idcta:"+$rootScope.ArrayListaPlantilla[i].idCuenta+">";
        Cadena += "<idter:"+$rootScope.ArrayListaPlantilla[i].idTercero+">";
        Cadena += "<obs:"+$rootScope.ArrayListaPlantilla[i].nomCuenta+">";
        Cadena += "<vlr:"+signo+$rootScope.ArrayListaPlantilla[i].valor+">";
        Cadena += "<idcco:"+$rootScope.ArrayListaPlantilla[i].idCco+">";
        Cadena += "</itm:"+cont+">";
          }
      }
      Cadena += "</doc:"+ $rootScope.idUsuario +">";

        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "RegTRN";
        $scope.parametros = Cadena+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(dataFactTotales, statusFactTotales) {
          $scope.status = status;
          $scope.resultadoReciboTotales = angular.fromJson(dataFactTotales);
          $scope.respuestaRecibotTotales = $scope.resultadoReciboTotales.return.toString();
          if($rootScope.SumD == 0){
              if($scope.respuestaRecibotTotales.toString() == "OK@#"){
                    $scope.hide();
                    var mensaje = "Registro Exitoso.";
                    $scope.showAlert("Mensaje",mensaje);
                }else{
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,$scope.respuestaRecibotTotales.toString());
                }
          }else{
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,"Sumas diferentes");
          }

          
        }); 
}
 $scope.showAlert = function(nomModulo,ok_error) {
   var alertPopup = $ionicPopup.alert({
     title: nomModulo,
     template: ok_error
   });
  if(nomModulo == "Error"){}else{
  return alertPopup.then(function(res) {
    $ionicTabsDelegate.select(0); 
    $rootScope.SumD = 0;
    $rootScope.ArrayListaPlantilla = [];
    $rootScope.ItenPlantilla = {};
     console.log('Thank you',res);
   });
 }
}
$scope.onTabSelecDet = function(){
    $rootScope.SumD = 0;
    $rootScope.ArrayListaPlantilla = [];
    $rootScope.ItenPlantilla = {};
}
})