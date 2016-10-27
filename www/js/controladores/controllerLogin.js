var adnApp = angular.module('LOGIN', []);

adnApp.controller('validacion', function($scope,$ionicPopup,$http,$window,$state,$rootScope,$ionicLoading){
  $rootScope.guardarDatos =  function(empresa,usuario){
    $window.localStorage.setItem("datos-usuario",angular.toJson(empresa,usuario));
  }
  $rootScope.cargarDatos = function(){
    $scope.obtenerDatos =  $window.localStorage.getItem("datos-usuario");
    return  $scope.obtenerDatos;
  }
  $rootScope.limpiarDatos = function(key){
  	$window.localStorage.removeItem(key);
  }
  $scope.datosGuardados = angular.fromJson($scope.cargarDatos());
  console.log($scope.datosGuardados);
  if($scope.datosGuardados != null){
  $scope.empresa = $scope.datosGuardados.empresa;
  $scope.usuario = $scope.datosGuardados.usuario;
  //$scope.password = "Rockx1993";
  }
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...<ion-spinner></ion-spinner>'
    }).then(function(){});};
  $scope.hide = function(){$ionicLoading.hide().then(function(){});};
$rootScope.siste = function(idS,nomS){
$rootScope.IDsistem =  idS;
$rootScope.NOMsistem =  nomS;
            }
  $scope.enviarFormulario = function(isValid){
    if(isValid){
	$scope.show();
        $scope.url = "http://www.tinformatica.com/form/llamandoBD.php";
        $scope.sql = "ML-01";
        $scope.parametros = $scope.empresa+"@#"+$scope.usuario+"@#"+$scope.password+"@#";
                    $http.post($scope.url, {"usuario":$scope.usuario,"password":$scope.password,"empresa":"ADN","sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
                            success(function(data, status) {
                                $scope.status = status;
                                $scope.resultado = angular.fromJson(data);
                                $scope.respuesta = $scope.resultado.return.toString();
                                if($scope.respuesta.toString().indexOf("Error") == 0){
                                $scope.hide();
                                 var resArray = [$scope.respuesta.split("@#")];
                                 var alertPopup = $ionicPopup.alert({
                                   title: 'Error',
                                   template: resArray[0].toString().substring(0,resArray[0].toString().lastIndexOf(",")),
                                   okText: 'Cerrar', 
                                   okType: 'button-positive'
                                 });
                                }else if($scope.resultado.return.toString().indexOf("MULTIPLES SISTEMAS")>=0){
                                  var resArray = $scope.resultado.return.toString().split("@#");
                                    var separando = resArray.toString().split("|");
                                    for (var i = 0; i < separando.length; i++) {
                                            $rootScope.mulSistemas = separando[0];
                                            $rootScope.idEmpresa = separando[1];
                                            $rootScope.idUsuario = separando[2].toString().substring(0,separando[2].toString().lastIndexOf(","));
                                    };
                                  $scope.sql = "MS-01";
                                  $scope.parametros = $rootScope.idUsuario+"@#";
                                  $http.post($scope.url, {"usuario":$rootScope.idUsuario,"password":$scope.password,"empresa":$rootScope.idEmpresa,"sql":$scope.sql,"parametros":$scope.parametros,"hash":$scope.hash}).
                                  success(function(dataMul, status) {
                                  $scope.status = status;
                                  $scope.multiple_sistemas = angular.fromJson(dataMul);
                                  $scope.respuesta_sistemas = $scope.multiple_sistemas.return.toString();
                                              if($scope.resultado.return.toString().indexOf("Error") >= 0){
                                              $rootScope.error = "Error al cargar los datos.";$scope.hide();
                                              }else{
                                               $scope.hide();
                                              var primerArray = []; var segundoArray= [];$rootScope.mSistemas = [];
                                              var arrayobjets = $scope.respuesta_sistemas.split("|");
                                              for (var item in arrayobjets) {
                                                    var itemArray = arrayobjets.toString().split("@#")[item];
                                                    primerArray.push(itemArray);
                                              };
                                              var result = primerArray.filter(Boolean);
                                              for (var i = 0; i < result.length; i++) {
                                                if([result[i]]){
                                                    var obtener = result[i].toString().split(",");
                                                    segundoArray.push(obtener);
                                                }
                                              };
                                              for (var i = 0; i < segundoArray.length; i++) {
                                                    $rootScope.mSistemas.push(segundoArray[i]);
                                              }
                                            }
                                            var myPopup = $ionicPopup.show({
                                              templateUrl: 'app/mulSistemas.html',
                                              title: 'Seleccione su sistema:',
                                              scope: $scope,
                                              buttons: [
                                                { text: 'Cancel',type: 'button-dark' },
                                                {
                                                  text: '<b>Aplicar</b>',
                                                  type: 'button-positive',
                                                  onTap: function(e) {                 
                                                        return [$rootScope.IDsistem,$rootScope.NOMsistem];
                                                  }
                                                }
                                              ]
                                            });
                                    myPopup.then(function(res) {
                                      var resP = [];
                                         if($rootScope.IDsistem) {
                                              for(var i = 0;i < res.length;i++){
                                              resP.push(res[i]);               
                                              } 
                                          $rootScope.nomEmpresa = resP[1];
                                          $rootScope.idSistema = resP[0];
                                          $rootScope.usuario = $scope.usuario;
                                          $rootScope.password = $scope.password;
                                          $rootScope.empresa = $scope.empresa;
                                          $scope.guardarDatos({"empresa":$scope.empresa,"usuario":$scope.usuario});
                                          $scope.hide();
                                          $state.go('app.home');
                                          $scope.password = '';                                         
                                         } else {
                                          $scope.hide();
                                         }
                                       });
                                  });
                                }
                                else{
                                $scope.hide();
                                  var resArray = $scope.respuesta.split("@#");
                                  var separando = resArray.toString().split("|");
                                  for (var i = 0; i < separando.length; i++) {
                                          $rootScope.idEmpresa = separando[0];
                                          $rootScope.idUsuario = separando[1];
                                          $rootScope.idSistema = separando[2];
                                          $rootScope.nomEmpresa = separando[3];
                                  };
                                  $scope.guardarDatos({"empresa":$scope.empresa,"usuario":$scope.usuario});
                                  $state.go('app.home');
                                  $rootScope.usuario = $scope.usuario;
                                  $rootScope.password = $scope.password;
                                  $rootScope.empresa = $scope.empresa;
                                  $scope.password = '';
                                }                     
                            });
    }
  }
})