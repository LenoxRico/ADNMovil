var adnApp = angular.module('INICIO', []);

adnApp.controller('botonSalida',function ($scope,$ionicPopup,$rootScope,$window,$ionicPlatform,$state,$ionicSideMenuDelegate) {
  ionic.Platform.ready(function(){
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.home"){
      navigator.app.exitApp();
    }
    else {
      //navigator.app.backHistory();
      $ionicSideMenuDelegate.toggleLeft();
    }
  }, 100);
  });

  var deviceInformation = ionic.Platform.device();
  var isWebView = ionic.Platform.isWebView();
  var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
  $rootScope.isAndroid = ionic.Platform.isAndroid();
  var isWindowsPhone = ionic.Platform.isWindowsPhone();
  var currentPlatform = ionic.Platform.platform();
  var currentPlatformVersion = ionic.Platform.version();

  $rootScope.exit = function(){
    var confirmPopup = $ionicPopup.confirm({
       title: 'EXIT ',
       template: 'Desea salir?',
       cancelText: 'No', // String (default: 'Cancel'). The text of the Cancel button.
       cancelType: 'button-dark', // String (default: 'button-default'). The type of the Cancel button.
       okText: 'Si', // String (default: 'OK'). The text of the OK button.
       okType: 'button-dark', // String (default: 'button-positive'). The type of the OK button.
     });
     confirmPopup.then(function(res) {
       if(res) {
        ionic.Platform.exitApp(); // stops the app 
       	//$rootScope.limpiarDatos("datos-usuario");
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
  }
})
