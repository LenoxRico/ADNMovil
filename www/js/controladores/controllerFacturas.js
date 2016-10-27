var adnApp = angular.module('FAC_REM_PED', []);

adnApp.controller('FacRemPeController',function($scope,$state,$rootScope,$http,$ionicLoading,$ionicPopup,$window,$ionicTabsDelegate) {
    $scope.data = []; $rootScope.activo = true; $rootScope.activoParam = true;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
    $rootScope.sum = 0;
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
$scope
	$scope.Buscar = function(textBusqueda){
	$scope.show();
	 if(textBusqueda == undefined){textBusqueda = "";}
	      $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CON_CLI";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
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
                            var ArrayItems = [];    $rootScope.ArrayFacturaCliente = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayFacturaCliente.push(itemArray);
                            }//console.log($rootScope.ArrayFacturaCliente);
                    }
        });
	}
  $scope.itemSeleccionado = function(argUno,argDos,argTres){
    $ionicTabsDelegate.select(1);
    $rootScope.verCandado = true; $rootScope.activoParam = false;
    $rootScope.ArrayFacturaParametros = [];$rootScope.arregloFinal = [];
     // idCliente =  argUno ; //idVendedor = idUsuario
    $rootScope.nomCliente =  argDos;
    $rootScope.codCliente = argTres;
   $rootScope.parametrosGuardados = angular.fromJson($scope.cargarParametros());
  if($scope.parametrosGuardados != null){;
    $rootScope.error = "";
    $scope.data.tDoc = $rootScope.parametrosGuardados.docu;
    $scope.data.cCos = $rootScope.parametrosGuardados.cco;
    $scope.data.bod = $rootScope.parametrosGuardados.bod;
    $scope.data.lPre = $rootScope.parametrosGuardados.lpre;
    $rootScope.Docu = $rootScope.parametrosGuardados.docu;
    $rootScope.costo = $rootScope.parametrosGuardados.cco;
    $rootScope.bodega = $rootScope.parametrosGuardados.bod;
    $rootScope.lisPrecio = $scope.parametrosGuardados.lpre;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.parametrosGuardados.docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.parametrosGuardados.cco},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.parametrosGuardados.bod},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.parametrosGuardados.lpre}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
  }else{
    $scope.data.tDoc = "";
    $scope.data.cCos = "";
    $scope.data.bod = "";
    $scope.data.lPre = "";
    $rootScope.Docu = "";
    $rootScope.costo = "";
    $rootScope.bodega = "";
    $rootScope.lisPrecio = "";
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:""},
                             {id:2,nombre:"C Costo",datoAsigado:""},
                             {id:3,nombre:"Bodega",datoAsigado:""},
                             {id:4,nombre:"L Precios",datoAsigado:""}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
  }
  }
  $scope.popDato = function(argumento){
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
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.Docu = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:""},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
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
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.costo = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:""},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
});
          break;
        case 3:
                var myPopup = $ionicPopup.show({
                  template: '<input type="text" ng-model="data.bod">',
                  title: 'Bodega:',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancelar',type: 'button-dark' },
                    {
                      text: '<b>Aplicar</b>',
                      type: 'button-positive',
                onTap: function(e) {                   
                    if(angular.toJson($scope.data.bod) == undefined)
                    {
                      return "0";
                    }else {
                      return $scope.data.bod;
                    }
                }
              }
            ]
          });
  myPopup.then(function(res) {
       if(res) {
    $rootScope.bodega = res;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.bodega = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:""},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
});
          break;
        case 4:
          var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.lPre">',
            title: 'Lista de precios',
            scope: $scope,
            buttons: [
              { text: 'Cancel',type: 'button-dark' },
              {
                text: '<b>Aplicar</b>',
                type: 'button-positive',
                onTap: function(e) {                 
                    if(angular.toJson($scope.data.lPre) == undefined)
                    {
                      return "0";
                    }else {
                      return $scope.data.lPre;
                    }
                }
              }
            ]
          });
  myPopup.then(function(res) {
       if(res) {
    $rootScope.lisPrecio = res;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:$rootScope.lisPrecio}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
    if(res == 0){
    $rootScope.lisPrecio = undefined;
    $rootScope.parametros = [{id:1,nombre:"T Docu",datoAsigado:$rootScope.Docu},
                             {id:2,nombre:"C Costo",datoAsigado:$rootScope.costo},
                             {id:3,nombre:"Bodega",datoAsigado:$rootScope.bodega},
                             {id:4,nombre:"L Precios",datoAsigado:""}];
    $rootScope.paramJson = angular.fromJson($rootScope.parametros);
       }
});
          break;
      }
  }
  $scope.guardarParametros =  function(docu,cco,bod,lpre){
          switch($rootScope.modulo){
            case "Facturas Crédito":
            $window.localStorage.setItem("datos-parametros-factura",angular.toJson(docu,cco,bod,lpre));
              break;
            case "Remisiones":
            $window.localStorage.setItem("datos-parametros-remisiones",angular.toJson(docu,cco,bod,lpre));
              break;
            case "Pedidos":
            $window.localStorage.setItem("datos-parametros-pedidos",angular.toJson(docu,cco,bod,lpre));
              break;
          }
  }
  $scope.cargarParametros = function(){
          switch($rootScope.modulo){
            case "Facturas Crédito":
            $scope.obtenerParametrosFacturas =  $window.localStorage.getItem("datos-parametros-factura");
            return  $scope.obtenerParametrosFacturas;
              break;
            case "Remisiones":
            $scope.obtenerParametrosRemision =  $window.localStorage.getItem("datos-parametros-remisiones");
            return  $scope.obtenerParametrosRemision;
              break;
            case "Pedidos":
            $scope.obtenerParametrosPedidos =  $window.localStorage.getItem("datos-parametros-pedidos");
            return  $scope.obtenerParametrosPedidos;
              break;
          }
  }

$scope.validar  = function(){
  $rootScope.activo = false;
  $rootScope.idVendedor = $rootScope.idUsuario;
  console.log($rootScope.Docu);
  $rootScope.textError = "";
  if($rootScope.codCliente == "" || $rootScope.Docu == "" || $rootScope.costo == "" || $rootScope.bodega == "" || $rootScope.lisPrecio == "" || $rootScope.idVendedor == ""){
      $rootScope.textError = "Digite todos los campos.";$rootScope.ArrayFacturaParametros = [];
  }else{
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MF-01";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idSistema+"@#"+$rootScope.Docu+"@#"+$rootScope.codCliente+"@#"+$rootScope.costo+"@#"+$rootScope.bodega+"@#"+$rootScope.idVendedor+"@#"+$rootScope.lisPrecio+"@#"+$rootScope.modulo+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(data, status) {
          $scope.status = status;
          $scope.resultado = angular.fromJson(data);
          $scope.respuesta = $scope.resultado.return.toString();
                      if($scope.resultado.toString().indexOf("Error") == 0){
                      $rootScope.error = "Error al cargar los datos.";
                      }else{
                      if($rootScope.Docu == undefined){$rootScope.textError = "Digite todos los campos.";$rootScope.ArrayFacturaParametros = [];}else{
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayFacturaParametros = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayFacturaParametros.push(itemArray);
                            }console.log($rootScope.ArrayFacturaParametros);
                      $scope.guardarParametros({"docu":$rootScope.Docu,"cco":$rootScope.costo,"bod":$rootScope.bodega,"lpre":$rootScope.lisPrecio});                      
                      var diviendoParametros = [];$rootScope.paramsFact = {"tdocId":"","tdocNombre":"",
                                                                           "idCliente":"","cliente":"","ccostoId":"",
                                                                           "ccostoNombre":"","bodega":"",
                                                                           "vendedorId":"","vendedorNombre":"","lpreciosNombre":""
                                                                          };
                      diviendoParametros = $rootScope.ArrayFacturaParametros[0][0].toString().split(":");
                      $rootScope.paramsFact.tdocId = diviendoParametros[1];
                      $rootScope.paramsFact.tdocNombre = diviendoParametros[0];
                      diviendoParametros = $rootScope.ArrayFacturaParametros[0][1].toString().split(":");
                      $rootScope.paramsFact.cliente = diviendoParametros[0];
                      $rootScope.paramsFact.idCliente = diviendoParametros[1];
                      diviendoParametros = $rootScope.ArrayFacturaParametros[0][2].toString().split(":");
                      $rootScope.paramsFact.ccostoId = diviendoParametros[1];
                      $rootScope.paramsFact.ccostoNombre = diviendoParametros[0];
                      diviendoParametros = $rootScope.ArrayFacturaParametros[0][3].toString().split(":");
                      $rootScope.paramsFact.bodega = diviendoParametros[0];
                      diviendoParametros = $rootScope.ArrayFacturaParametros[0][4].toString().split(":");
                      $rootScope.paramsFact.vendedorId = diviendoParametros[1];
                      $rootScope.paramsFact.vendedorNombre = diviendoParametros[0];
                      $rootScope.paramsFact.lpreciosNombre = $rootScope.ArrayFacturaParametros[0][5];
                      $rootScope.arregloFinal = [$rootScope.paramsFact.tdocNombre,$rootScope.paramsFact.ccostoNombre,
                                                 $rootScope.paramsFact.bodega,$rootScope.paramsFact.lpreciosNombre];
                      if(
                        $rootScope.paramsFact.tdocNombre.toString().substr(0,3) == "ERR" ||
                        $rootScope.paramsFact.ccostoNombre.toString().substr(0,3) == "ERR" ||
                        $rootScope.paramsFact.bodega.toString().substr(0,3) == "ERR" ||
                        $rootScope.paramsFact.lpreciosNombre.toString().substr(0,3) == "ERR"
                      ){
                        $rootScope.textError = "Parametros invalidos";
                      }else{$ionicTabsDelegate.select(2);}
                      }
                    }
        });
  }
}
$scope.articulo = function(){
  console.log($rootScope.caso);
  $state.go('app.inventario');
}
$rootScope.listaItemsFacturas = [];
  for (var i = 0; i < $rootScope.listaItemsFacturas.length; i++) {
    if(reFeren == $rootScope.listaItemsFacturas[i].referencia){
    $scope.refe = $rootScope.listaItemsFacturas[i].referencia;
    $scope.data.vlr= $rootScope.listaItemsFacturas[i].valoru;
    $scope.data.cant = $rootScope.listaItemsFacturas[i].cantidad;
    $scope.data.desc = $rootScope.listaItemsFacturas[i].descuento;
    }
  };
$scope.itemFactura = function (reFeren) {
  $rootScope.sum = 0;
  for (var i = 0; i < $rootScope.listaItemsFacturas.length; i++) {
    if(reFeren == $rootScope.listaItemsFacturas[i].referencia){
    $scope.refe = $rootScope.listaItemsFacturas[i].referencia;
    $scope.data.vlr= $rootScope.listaItemsFacturas[i].valoru;
    $scope.data.cant = $rootScope.listaItemsFacturas[i].cantidad;
    $scope.data.desc = $rootScope.listaItemsFacturas[i].descuento;
    }
  };
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
                            return [$scope.data.vlr,$scope.data.cant,$scope.data.desc,reFeren];
                      }
                    }
                  ]
                });
        myPopup.then(function(res) {
              $rootScope.Res = [];
             if(res && $scope.data.cant != 0) {
              for(var i = 0;i < res.length;i++){
              $rootScope.Res.push(res[i]);           
              }   
                for (var i = 0; i < $rootScope.listaItemsFacturas.length; i++) {
              if(reFeren == $rootScope.listaItemsFacturas[i].referencia){
                $rootScope.listaItemsFacturas[i].valoru = $rootScope.Res[0];
                $rootScope.listaItemsFacturas[i].cantidad = $rootScope.Res[1];
                $rootScope.listaItemsFacturas[i].descuento = $rootScope.Res[2];
                $rootScope.listaItemsFacturas[i].sTotal = $rootScope.Res[0] * $rootScope.Res[1] * (100-$rootScope.Res[2])/100;
              }
                $rootScope.sum += ($rootScope.listaItemsFacturas[i].sTotal);
                }
                console.log($rootScope.Res);
             } else {
               console.log('You are not sure');
             }
           });
}
$scope.factTotal = function(){
  $rootScope.sumatoria = $rootScope.sum;
        var totalMercancia = 0;
        var totalServicio = 0;
        var totalIva = 0;
        var totalDescuento = 0;
        var subTotal = 0;
        for (var i = 0; i < $rootScope.listaItemsFacturas.length; i++) {
          if($rootScope.listaItemsFacturas[i].tipo.toString() == "B"){
            totalMercancia += $rootScope.listaItemsFacturas[i].sTotal;
          }else{
            totalServicio += $rootScope.listaItemsFacturas[i].sTotal;
          }
          subTotal += $rootScope.listaItemsFacturas[i].sTotal;
          totalIva += Number($rootScope.listaItemsFacturas[i].sTotal)*Number($rootScope.listaItemsFacturas[i].grav)/100 ; 
          totalDescuento += Number($rootScope.listaItemsFacturas[i].valoru)*Number($rootScope.listaItemsFacturas[i].cantidad)*Number($rootScope.listaItemsFacturas[i].descuento)/100;
        }
        $rootScope.tMercancia = totalMercancia; 
        $rootScope.tServicios = totalServicio;
        $rootScope.tIva = totalIva;
        $rootScope.tDescuento = totalDescuento; 
        $rootScope.tCtaCobrar = (subTotal + totalIva);    
}
$scope.grabar = function () {
  $rootScope.parametrosGuardados = angular.fromJson($scope.cargarParametros());
//$rootScope.sum = 0;
console.log($rootScope.sumatoria);
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
      Cadena += "<tdc:"+ $rootScope.paramsFact.tdocId +">";
      Cadena += "<sis:"+ $rootScope.idSistema +">";
      Cadena += "<usr:"+ $rootScope.idUsuario +">";
      Cadena += "<cli:"+ $rootScope.paramsFact.idCliente +">";
      Cadena += "<fch:"+ dia+mes+year+hora+min +">";
      Cadena += "<pre:"+ $rootScope.parametrosGuardados.lpre +">";
      Cadena += "<cco:"+ $rootScope.parametrosGuardados.cco +">";
      Cadena += "<bod:"+ $rootScope.parametrosGuardados.bod +">";
      Cadena += "<tml:"+ "ADNMOV" + $rootScope.idUsuario +">";
      Cadena += "</enc>";
      
      var cont = 1;
      for (var i = 0; i < $rootScope.listaItemsFacturas.length; i++) {
        console.log($rootScope.listaItemsFacturas);
        Cadena += "<itm:"+cont+">";
        Cadena += "<art:"+$rootScope.listaItemsFacturas[i].id +">";
        Cadena += "<can:"+$rootScope.listaItemsFacturas[i].cantidad+">";
        Cadena += "<vun:"+$rootScope.listaItemsFacturas[i].valoru+">";
        Cadena += "<dst:"+$rootScope.listaItemsFacturas[i].descuento+">";
        Cadena += "</itm:"+cont+">";
        cont ++;
      }
      Cadena += "</doc:"+ $rootScope.idUsuario +">";
if($rootScope.sumatoria == 0){
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,"No selecciono ningun artículo");

}else{
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "CreFact";
        $scope.parametros = Cadena+"@#";
        $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
          success(function(dataFactTotales, statusFactTotales) {
          $scope.status = status;
          $scope.resultadoFactTotales = angular.fromJson(dataFactTotales);
          $scope.respuestaFactTotales = $scope.resultadoFactTotales.return.toString();         

              if($scope.respuestaFactTotales.toString() == "OK@#"){
                  switch($rootScope.modulo){
                    case "Facturas Crédito":
                    $scope.hide();
                    var mensaje = "Factura Exitosa.";
                    $scope.showAlert($rootScope.modulo,mensaje);
                      break;
                    case "Remisiones":
                    $scope.hide();
                    var mensaje = "Remisión Exitosa.";
                    $scope.showAlert($rootScope.modulo,mensaje);
                      break;
                    case "Pedidos":
                    $scope.hide();
                    var mensaje = "Pedido Exitoso.";
                    $scope.showAlert($rootScope.modulo,mensaje);
                      break;
                    }
                }else{
                    $scope.hide();
                    var mensaje = "Error";
                    $scope.showAlert(mensaje,$scope.respuestaFactTotales.toString());
                }

        });
        }
}
 $scope.showAlert = function(nomModulo,ok_error) {
   var alertPopup = $ionicPopup.alert({
     title: nomModulo,
     template: ok_error
   });
  if(nomModulo == "Error"){}else{
  return alertPopup.then(function(res) {
    $rootScope.sum = 0;  
    $rootScope.listaItemsFacturas = [];
    $ionicTabsDelegate.select(0);
    $rootScope.activo = true;
    $rootScope.activoParam = true;
     console.log('Thank you',res);
   });
 }
}
})
