var adnApp = angular.module('MENU', []);

adnApp.controller('menuOpciones',function($scope,$rootScope,$http,$ionicPopup,$ionicTabsDelegate,$state,$window){
  //Datos para parametros
  $rootScope.usuario;
  $rootScope.password;
  $rootScope.empresa;

  $rootScope.exit = function(){
    var confirmPopup = $ionicPopup.confirm({
       title: 'EXIT ',template: 'Desea cerrar sesión?', cancelText: 'No',
       cancelType: 'button-dark',okText: 'Si',okType: 'button-dark',
     });
     confirmPopup.then(function(res) {
       if(res) {
        ionic.Platform.exitApp(); // stops the app 
        $state.go('login');
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
  }
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "MO-02";
        var strHash = $scope.usuario+$scope.password+$scope.empresa+$scope.sql;
        $scope.hash = CryptoJS.HmacMD5("md5",strHash,"key");
        $scope.parametros = $rootScope.idUsuario+"@#";
                    $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$rootScope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
                            success(function(data, status) {
                                $scope.status = status;
                                $scope.resultado = angular.fromJson(data);
                                $scope.respuesta = $scope.resultado.return.toString();
                                if($scope.resultado.toString().indexOf("Error") == 0){
                                  $rootScope.error = "Error al cargar los datos.";
                                }else{  
                            var arrayobjets = $scope.respuesta.split("@#");
                            var ArrayItems = [];    $rootScope.ArrayMenu = []; 
                            ArrayItems.push(arrayobjets); 
                            for (var i = 0; i < ArrayItems[0].length; i++) {
                              var itemArray = ArrayItems[0][i].toString().split("|");
                             $rootScope.ArrayMenu.push(itemArray);
                            }console.log($rootScope.ArrayMenu);
                    }
        });
  $rootScope.toggleMenu = function(nombreOpcion,runOpcion){
    console.log(nombreOpcion,runOpcion);
        $rootScope.listaItemsFacturas = [];
        $ionicTabsDelegate.select(0);
        $rootScope.sum = 0;   
          switch(nombreOpcion){
            case "Facturas A Crédito Adn Movil":
            $rootScope.modulo = "Facturas Crédito";
            $rootScope.titulo = "Escoja Los Artículos";
              break;
            case "Remisión De Mercancías Adn Movil":
            $rootScope.modulo = "Remisiones";
            $rootScope.titulo = "Escoja Los Artículos";
              break;
            case "Pedidos Adn Movil Adn Movil":
            $rootScope.modulo = "Pedidos";
            $rootScope.titulo = "Escoja Los Artículos";
              break;
          }
          switch(runOpcion){
            case "MV_VENTAS_CREDITO":
            $scope.nombreSeleccionado = "Facturas A Crédito";
            $rootScope.nav = "tabs";
            $rootScope.caso = 2;
            if($rootScope.caso == 2){$rootScope.title = "Escoja Los Artículos";} 
              break;
            case "MV_REMISIONES":
            $scope.nombreSeleccionado = "Remisión De Mercancías A Clientes";
            $rootScope.nav = "tabs";
            $rootScope.caso = 2;
            if($rootScope.caso == 2){$rootScope.title = "Escoja Los Artículos";} 
            $rootScope.activo = true;
              break;
            case "MV_PEDIDOS":
            $scope.nombreSeleccionado = "Pedidos";
            $rootScope.nav = "tabs";
            $rootScope.caso = 2;
            if($rootScope.caso == 2){$rootScope.title = "Escoja Los Artículos";} 
              break;
            case "MV_INGRESO_CLIENTES":
            $scope.nombreSeleccionado = "Recibos De Caja";
            $rootScope.nav = "reciboCaja";
              break;
            case "MV_CONSULTA_CARTERA":
            $scope.nombreSeleccionado = "Consulta De Cartera";
            $rootScope.nav = "cartera";
              break;
            case "MV_CONSULTA_INVENTARIOS":
            $rootScope.nav = "inventario"; 
            $rootScope.caso = 1;
            if($rootScope.caso == 1){$rootScope.title = "Consulta De Inventarios";}           
              break;
            case "MV_CONSULTA_PROVEEDORES":
            $scope.nombreSeleccionado = "Consulta De Cuentas X Pagar";
            $rootScope.nav = "cuentas_por_pagar";
              break;
            case "MV_CONSULTA_MOVIMIENTOS":
            $scope.nombreSeleccionado = "Consulta De Transacciones";
            $rootScope.nav = "consulta_transacciones";
              break;
            case "MV_CONSULTA_BALANCE":
            $scope.nombreSeleccionado = "Consulta De Balance";
            $rootScope.nav = "balance";
              break;
            case "MV_ESTADO_RESULTADOS":
            $scope.nombreSeleccionado = "Estado De Resultados";
            $rootScope.nav = "estadoResultados";
              break;
            case "MV_DIMEN_FINANCIERAS":
            $scope.nombreSeleccionado = "Inteligencia De Negocios";
            $rootScope.nav = "inteligencia";
              break;
            case "MV_REGISTRO_TRANSACCIONES":
            $scope.nombreSeleccionado = "Registro De Transacciones";
            $rootScope.nav = "registrotransaccion";
              break;
            case "MV_CONSULTA_CRM":
            $scope.nombreSeleccionado = "Consulta De Mercadeo Y CRM";
            $rootScope.nav = "mercadeo";
              break;
          }
  }
})
