var adnApp = angular.module('RECIBO_CAJA', []);

adnApp.controller('ReciboCajaController', function ($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$window,$ionicTabsDelegate) {
$rootScope.tabActivo1 = true;
$rootScope.tabActivo2 = true; 
$scope.data = [];
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
$scope.show = function() {$ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'}).then(function(){ });};
$scope.hide = function(){$ionicLoading.hide().then(function(){ });};

if($rootScope.consulDetalleCartera == undefined){
 $scope.Buscar = function(textBusqueda){
	$scope.show();
	 if(textBusqueda == undefined){textBusqueda = "";}
	      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MC-01";
        $scope.parametros = textBusqueda+"@#"+$rootScope.idSistema+"@#";
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
                      var ArrayItems = [];    $rootScope.ArrayCartera = []; 
                      ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                      for (var i = 0; i < ArrayItems[0].length; i++) {
                          var itemArray = ArrayItems[0][i].toString().split("|");
                           $rootScope.ArrayCartera.push(itemArray);
                            }console.log($rootScope.ArrayCartera);
                      //Se eliminar el ultimo elemento vacio del arreglo para realizar la suma
                      var rmItem =  $rootScope.ArrayCartera.slice(0, -1);
                      for (var p = 0; p < rmItem.length; p++) {
                            suma.push(rmItem[p][3]);
                            $scope.sum += parseInt(suma[p]);
                          }
                    }
        });
	}
}
$rootScope.guardarParametros =  function(docu,cco){
            $window.localStorage.setItem("datos-parametros-rec_caja",angular.toJson(docu,cco));
  }
$rootScope.cargarParametros = function(){
            $scope.obtenerParametrosRecibo =  $window.localStorage.getItem("datos-parametros-rec_caja");
            return $scope.obtenerParametrosRecibo;
  }
  $scope.itemSeleccionado = function(argUno,argDos,argTres,argCuatro){
    $rootScope.ArrayResultParams = [];$rootScope.arregloFinalR = [];
    $rootScope.idCliente = argCuatro;
    $rootScope.nomCliente =  argDos;
    $rootScope.codCliente = argUno;
    $rootScope.valCliente = argTres;
    $rootScope.tabActivo1 = false;
    $ionicTabsDelegate.select(1);
  $rootScope.parametrosGuardados = angular.fromJson($rootScope.cargarParametros());
    console.log(argUno+" / "+argDos+" / "+argTres+" / "+argCuatro +" / "+ $rootScope.parametrosGuardados);

if($scope.parametrosGuardados != null){;
    $rootScope.error = "";
    $scope.data.tDoc = $rootScope.parametrosGuardados.docu;
    $scope.data.cCos = $rootScope.parametrosGuardados.cco;
    $rootScope.Docu = $rootScope.parametrosGuardados.docu;
    $rootScope.costo = $rootScope.parametrosGuardados.cco;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.parametrosGuardados.docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.parametrosGuardados.cco}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
  }else{
    $scope.data.tDoc = "";
    $scope.data.cCos = "";
    $rootScope.Docu = "";
    $rootScope.costo = "";
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:""},
                             {id:2,nombre:"C Costo",datoAsigado:""}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
  }
  }
  $rootScope.popDato = function(argumento){
      switch (argumento){
        case 1:
              var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.tDoc">',
                title: 'Tipo de documento:',
                scope: $scope,
                buttons: [
                  { text: 'Cancelar',type: 'button-dark' },
                  {
                    text: '<b>Aplicar</b>',
                    type: 'button-positive',
                onTap: function(e) {                
                    if(angular.toJson($scope.data.tDoc) == undefined)
                    {
                      return "0";
                    }else {
                      return $scope.data.tDoc;
                    }
                }
              }
            ]
          });
  myPopup.then(function(res) {
       if(res) {
    $rootScope.Docu = res;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.Docu = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:""},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
});
          break;
        case 2:
              var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.cCos">',
                title: 'Centro de costo:',
                scope: $scope,
                buttons: [
                  { text: 'Cancelar',type: 'button-dark' },
                  {
                    text: '<b>Aplicar</b>',
                    type: 'button-positive',
                onTap: function(e) {                 
                    if(angular.toJson($scope.data.cCos) == undefined)
                    {
                      return "0";
                    }else {
                      return $scope.data.cCos;
                    }
                }
              }
            ]
          });
  myPopup.then(function(res) {
       if(res) {
    $rootScope.costo = res;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.costo = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:""}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
});
          break;
      }
  }
$rootScope.validar  = function(){
  $rootScope.activo = false;
  $rootScope.tabActivo2 = false;
  $rootScope.idVendedor = $rootScope.idUsuario;
  console.log($rootScope.Docu);
  $rootScope.textError = "";
  if($rootScope.codCliente == "" || $rootScope.Docu == "" || $rootScope.costo == "" || $rootScope.idVendedor == ""){
      $rootScope.textError = "Digite todos los campos.";$rootScope.ArrayResultParams = [];
  }else{
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MR-01";
        $scope.parametros = $rootScope.idSistema+"@#"+$rootScope.Docu+"@#"+$rootScope.costo+"@#"+$rootScope.idVendedor+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                      if($rootScope.Docu == undefined){$rootScope.textError = "Digite todos los campos.";$rootScope.ArrayResultParams = [];}else{
                      var arrayobjets = $scope.respuesta.split("@#");
                      var ArrayItems = [];    $rootScope.ArrayResultParams = []; 
                      ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                      for (var i = 0; i < ArrayItems[0].length; i++) {
                          var itemArray = ArrayItems[0][i].toString().split("|");
                           $rootScope.ArrayResultParams.push(itemArray);
                            }console.log($rootScope.ArrayResultParams);

                      $scope.guardarParametros({"docu":$rootScope.Docu,"cco":$rootScope.costo});                      
                      var diviendoParametros = [];$rootScope.paramsRe_caja = {"tdocId":"","tdocNombre":"",
                                                                                "ccostoId":"","ccostoNombre":""};
                      diviendoParametros = $rootScope.ArrayResultParams[0][0].toString().split(":");
                      $rootScope.paramsRe_caja.tdocId = diviendoParametros[1];
                      $rootScope.paramsRe_caja.tdocNombre = diviendoParametros[0];
                      diviendoParametros = $rootScope.ArrayResultParams[0][1].toString().split(":");
                      $rootScope.paramsRe_caja.ccostoId = diviendoParametros[1];
                      $rootScope.paramsRe_caja.ccostoNombre = diviendoParametros[0];
                     
                      $rootScope.arregloFinalR = [$rootScope.paramsRe_caja.tdocNombre,$rootScope.paramsRe_caja.ccostoNombre];
                      if(
                        $rootScope.paramsRe_caja.tdocNombre.substr(0,3) == "ERR" ||
                        $rootScope.paramsRe_caja.ccostoNombre.toString().substr(0,3) == "ERR" 
                      ){
                        $rootScope.textError = "Parametros invalidos";
                      }else{$ionicTabsDelegate.select(2);}
                      }
                    }
        });
  }
}
$rootScope.resMedio = [];  $rootScope.totalMedios = 0;
var obje = {tipo:"",num:"",banco:"",vlr:""};
$rootScope.medio_pago = function(tipo){
  if(tipo == undefined){
    $scope.selectMedio = true;$scope.boton = "Agregar";
    $scope.data.num = 0;
    $scope.data.banco = "";
    $scope.data.vlr = 0; 
  }else{
    $scope.selectMedio = false;$scope.boton = "Actualizar";
       for (var i = 0; i < $rootScope.resMedio.length; i++) {
        if(tipo == $rootScope.resMedio[i].tipo){
          $scope.data.num = $rootScope.resMedio[i].num;
          $scope.data.banco = $rootScope.resMedio[i].banco;
          $scope.data.vlr = $rootScope.resMedio[i].vlr;
        }
     }  
  }
  var myPopup = $ionicPopup.show({
    templateUrl: 'app/templatePopupMedioPago.html',
    title: 'Medios de pago',
    scope: $scope,
    buttons: [
      { text: 'Cancelar' },
      {
        text: '<b>'+$scope.boton+'</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.vlr) {
            e.preventDefault();
          } else {
                switch($scope.data.index){
                      case 0:
                            return ["Efectivo","","",$scope.data.vlr]
                        break;
                      case 1:
                            return ["Cheque",$scope.data.num,$scope.data.banco,$scope.data.vlr]
                        break;
                      case 2:
                            return ["Otro",$scope.data.num,$scope.data.banco,$scope.data.vlr]
                        break;
                    }              
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
  var array = []; $rootScope.verSiguiente = false;$rootScope.totalMedios = 0;
  if(res){
  for (var i = 0; i < res.length; i++) {
    array.push(res[i]);
  }
  obje.tipo = array[0];
  obje.num = array[1];
  obje.banco = array[2];
  obje.vlr = array[3];
   if($scope.boton == "Agregar" || $rootScope.resMedio.length < 0){
  $rootScope.resMedio.push(angular.fromJson(obje));
  obje = {};
  for (var t = 0; t < $rootScope.resMedio.length; t++) {
    $rootScope.totalMedios += ($rootScope.resMedio[t].vlr);
    //console.log($rootScope.resMedio[t].vlr);
  }
  $rootScope.verSiguiente = true;
  $rootScope.next();
}
  if($scope.boton == "Actualizar"){
      $rootScope.verSiguiente = true;
      $rootScope.next();
    for (var o = 0; o < $rootScope.resMedio.length; o++) {
                  if(tipo == $rootScope.resMedio[o].tipo){
                    $rootScope.resMedio[o].num = array[1];
                    $rootScope.resMedio[o].banco = array[2];
                    $rootScope.resMedio[o].vlr = array[3];
                  }
                  $rootScope.totalMedios = ($rootScope.resMedio[o].vlr);
                    }
  }
  }else{}
  });
}

  $scope.items = [{idMedio:1,nombre:"Efectivo"},{idMedio:2,nombre:"Cheque"},{idMedio:3,nombre:"Otro"}];
  $scope.data = [];
  $scope.data.index = 0;
  $scope.numero = true;
  $scope.banco = true;
  $scope.changedColor = function() {
          switch($scope.data.index){
            case 0:
            $scope.numero = true;
            $scope.banco = true;
            $scope.valor = false;
              break;
            case 1:
            $scope.numero = false;
            $scope.banco = false;
            $scope.valor = false;
              break;
            case 2:
            $scope.numero = false;
            $scope.banco = false;
            $scope.valor = false;
              break;
          }
  }
  //Consulta que trae los documentos recibo caja
$rootScope.ItenDocument = {fecha:"",rts:"",fin:"",saldo:"",rto:"",riv:"",rtc:"",ric:"",valor:"",id:"",afe:"",num:""};
    $rootScope.next = function(){
      $rootScope.ArrayDocumentos = [];
      $rootScope.ArrayDocumentosRecibo = []; 
      $ionicTabsDelegate.select(3);
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MR-02";
        $scope.parametros = $rootScope.idCliente+"@#";
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
                      var ArrayItems = [];   
                      ArrayItems.push(arrayobjets); var suma = [];$scope.sum = 0 ;
                      for (var i = 0; i < ArrayItems[0].length; i++) {
                          var itemArray = ArrayItems[0][i].toString().split("|");
                           $rootScope.ArrayDocumentosRecibo.push(itemArray);
                            }
                          var DocumentObjet = $rootScope.ArrayDocumentosRecibo.slice(0,-1);
                          //$rootScope.ArrayDocumentos = [];
                        for (var i = 0; i < DocumentObjet.length; i++) {
                           $rootScope.ItenDocument.afe = "0";
                            $rootScope.ItenDocument.fecha = DocumentObjet[i][2];
                            $rootScope.ItenDocument.fin = "0";
                            $rootScope.ItenDocument.id = DocumentObjet[i][0];
                            $rootScope.ItenDocument.num = DocumentObjet[i][1];
                            $rootScope.ItenDocument.ric = "0";
                            $rootScope.ItenDocument.riv = "0";
                            $rootScope.ItenDocument.rtc = "0";
                            $rootScope.ItenDocument.rto = "0";
                            $rootScope.ItenDocument.rts = "0";
                            $rootScope.ItenDocument.saldo = DocumentObjet[i][3];
                            $rootScope.ItenDocument.valor = "0";
                            $rootScope.ArrayDocumentos.push(angular.fromJson($rootScope.ItenDocument));
                            $rootScope.ItenDocument = {}
                        }
                      updatelist();
                    }
        });

    }
$rootScope.totalIngresos = 0;
$scope.dato = [];
$rootScope.itenListDocs = function (documentList) {

   $rootScope.idDocumento = documentList.id;
   $rootScope.numDocumento = documentList.num;
   $rootScope.fchDocumento = documentList.fecha;
   $rootScope.saldoDocumento = documentList.saldo;
   $rootScope.afeDocumento = documentList.afe;

  if(Number(documentList.afe) != 0){
    $scope.dato.afect = Number(documentList.afe);
  }else{
    if($rootScope.totalMedios - $rootScope.totalIngresos >= Number(documentList.saldo)){
      $scope.dato.afect = Number(documentList.saldo);
    }else{
      $scope.dato.afect = ($rootScope.totalMedios - $rootScope.totalIngresos);
    }
  }
  $scope.dato.finan = Number(documentList.fin);
  $scope.dato.comp = Number(documentList.rtc);
  $scope.dato.ser = Number(documentList.rts);
  $scope.dato.otro = Number(documentList.rto);
  $scope.dato.iva = Number(documentList.riv);
  $scope.dato.ica = Number(documentList.ric);
  $scope.makeTotal();
  var myPopup = $ionicPopup.show({
    templateUrl: 'app/templatePopupDocsRecibo.html',
    scope: $scope,
    buttons: [
      { text: 'Cancelar',type: 'button-stable', },
      {
        text: '<b>Actualizar</b>',
        type: 'button-positive',
        onTap: function(e) {
          if ($scope.dato.finan == undefined) {
            e.preventDefault();
          } else {
            return [$scope.dato.afec,$scope.dato.finan,$scope.dato.com,$scope.dato.se,$scope.dato.otr,$scope.dato.iv,$scope.dato.ic];
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
if(totalAfect != 0){
    if( $rootScope.saldoDocumento < Number($scope.dato.afec) + makeSubtotal()){
      makeTotal();
    }else{
      for (var i = 0; i < $rootScope.ArrayDocumentos.length; i++) {
    if(documentList.id == $rootScope.ArrayDocumentos[i].id){
        $rootScope.ArrayDocumentos[i].fecha = $rootScope.fchDocumento;
        $rootScope.ArrayDocumentos[i].rts = $scope.dato.ser;
        $rootScope.ArrayDocumentos[i].fin = $scope.dato.finan;
        $rootScope.ArrayDocumentos[i].saldo = $rootScope.saldoDocumento;
        $rootScope.ArrayDocumentos[i].rto = $scope.dato.otro;
        $rootScope.ArrayDocumentos[i].riv = $scope.dato.iva;
        $rootScope.ArrayDocumentos[i].rtc = $scope.dato.comp;
        $rootScope.ArrayDocumentos[i].ric = $scope.dato.ica;
        $rootScope.ArrayDocumentos[i].valor = $rootScope.ltotalAfec;
        $rootScope.ArrayDocumentos[i].id = $rootScope.idDocumento;
        $rootScope.ArrayDocumentos[i].afe = $scope.dato.afect;
        $rootScope.ArrayDocumentos[i].num = $rootScope.numDocumento;
        updatelist();
      }
    }
  }
}

  });
}
var totalAfect = 0;$scope.focus = false;

$scope.makeTotal =  function() {

  var subt = Number(makeSubtotal());
  if($scope.dato.finan == 0){
      totalAfect = $scope.dato.afect - subt;
  }else{
      $scope.dato.afect = Number($rootScope.saldoDocumento) - subt;
      totalAfect = $scope.dato.afect;
  }
  $rootScope.ltotalAfec = totalAfect;
}

function updatelist(){
        $rootScope.totalIngresos = 0;    
        for (var item = 0; item < $rootScope.ArrayDocumentos.length; item++){
          $rootScope.totalIngresos += Number($rootScope.ArrayDocumentos[item].valor);        
        } 
      }
function makeSubtotal() {
        var dtoFinan = 0;
        var retCompra = 0;
        var retServicios = 0;
        var retOtros = 0;
        var retIVA = 0;
        var retICA = 0;

 dtoFinan = Number($scope.dato.finan);
 retCompra = Number($scope.dato.comp);
 retServicios = Number($scope.dato.ser);
 retOtros = Number($scope.dato.otro);
 retIVA = Number($scope.dato.iva);
 retICA = Number($scope.dato.ica);

 return dtoFinan + retCompra + retServicios + retOtros + retIVA + retICA
}
$rootScope.onTabSelected = function(){
  $rootScope.totalMedios = 0;
  $rootScope.totalIngresos = 0;    
        for (var item = 0; item < $rootScope.ArrayDocumentos.length; item++){
          $rootScope.totalIngresos += Number($rootScope.ArrayDocumentos[item].valor);        
        } 
          console.log($rootScope.totalIngresos);
        for (var o = 0; o < $rootScope.resMedio.length; o++) {
                  $rootScope.totalMedios += ($rootScope.resMedio[o].vlr);
        }   
         console.log($rootScope.totalMedios);
        $rootScope.diferencia =  Number($rootScope.totalMedios)-Number($rootScope.totalIngresos);  
}

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
      Cadena += "<tdc:"+ $rootScope.paramsRe_caja.tdocId +">";
      Cadena += "<sis:"+ $rootScope.idSistema +">";
      Cadena += "<usr:"+ $rootScope.idUsuario +">";
      Cadena += "<cli:"+ $rootScope.idCliente +">";
      Cadena += "<fch:"+ dia+mes+year+hora+min +">";
      Cadena += "<cco:"+ $rootScope.paramsRe_caja.ccostoId +">";
      Cadena += "<tml:"+ "ADNMOV" + $rootScope.idUsuario +">";
      Cadena += "</enc>";
      
      for (var i = 0; i < $rootScope.ArrayDocumentos.length; i++) {
        console.log($rootScope.ArrayDocumentos);
        if(Number($rootScope.ArrayDocumentos[i].valor)>0){
          Cadena += "<afc:"+$rootScope.ArrayDocumentos[i].id+">";
          Cadena += "<vlr:"+$rootScope.ArrayDocumentos[i].afe+">";
          Cadena += "<fin:"+$rootScope.ArrayDocumentos[i].fin+">";
          Cadena += "<rtc:"+$rootScope.ArrayDocumentos[i].rtc+">";
          Cadena += "<rts:"+$rootScope.ArrayDocumentos[i].rts+">";
          Cadena += "<rto:"+$rootScope.ArrayDocumentos[i].rto+">";
          Cadena += "<riv:"+$rootScope.ArrayDocumentos[i].riv+">";
          Cadena += "<ric:"+$rootScope.ArrayDocumentos[i].ric+">";
          Cadena += "</afc:"+$rootScope.ArrayDocumentos[i].id+">";
          Cadena += "<tmp:E>";
          Cadena += "<vlr:"+$rootScope.ArrayDocumentos[i].afe+">";
          Cadena += "</tmp:E>";
        }
      }
      Cadena += "</doc:"+ $rootScope.idUsuario +">";

        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CreDoc";
        $scope.parametros = Cadena+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(dataFactTotales, statusFactTotales) {
          $scope.status = status;
          $scope.resultadoReciboTotales = angular.fromJson(dataFactTotales);
          $scope.respuestaRecibotTotales = $scope.resultadoReciboTotales.return.toString();
          if($rootScope.totalMedios != $rootScope.totalIngresos){
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,"La diferencia no es cero");
          }else{
              if($scope.respuestaRecibotTotales.toString() == "OK@#"){
                    $scope.hide();
                    var mensaje = "Recibo Exitoso.";
                    $scope.showAlert("Mensaje",mensaje);
                }else{
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,$scope.respuestaRecibotTotales.toString());
                }
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
    $rootScope.ArrayDocumentos = [];
    $rootScope.ItenDocument = {};
    $rootScope.ArrayDocumentosRecibo = [];
    $rootScope.resMedio = [];  
    $rootScope.totalMedios = 0;
    $rootScope.sum = 0;  
     console.log('Thank you',res);
   });
 }
}
})
