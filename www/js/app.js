// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var adnApp = angular.module('starter', ['ionic',
                                       'INICIO',
                                        'LOGIN',
                                         'MENU',
                                  'FAC_REM_PED',
                                   'INVENTARIO',
                             'DETALLE_ARTICULO',
                                  'RECIBO_CAJA',
                                      'CARTERA',
                              'DETALLE_CARTERA',
                            'DETALLE_DOCUMENTO',
                              'DETALLE_CLIENTE',
                            'CUENTAS_POR_PAGAR',
                            'DETALLE_PROVEEDOR',
                         'CONSULTA_TRANSACCION',
                        'DETALLE_TRANSACCIONES',
                                 'INTELIGENCIA',
                         'DETALLE_INTELIGENCIA',
                             'CONSULTA_BALANCE',
                            'CONSULTA_AUXILIAR',
                            'ESTADO_RESULTADOS',
                       'REGISTRO_TRANSACCIONES',
                            'CONSULTA_MERCADEO',
                             'DETALLE_MERCADEO',
                                'AGREGAR_TAREA'

                                  ]);

adnApp.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
adnApp.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('login',{
      url: '/Login',
      templateUrl: 'app/login.html',
      controller: 'validacion'
    })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu.html',
    controller: 'menuOpciones'
    })

    .state('app.home',{
      url:'/Bienvenido',
      views:{
        'menuContent':{
          templateUrl:'app/home.html'
        }
      }
    })
    .state('app.tabs', {
      url: '/tabs',
      views: {
        'menuContent': {
          templateUrl: 'app/tabFacturas.html',
                 controller : 'FacRemPeController'
             }
         }
    })
    .state('app.reciboCaja', {
      url: '/reciboCaja',
      views: {
        'menuContent': {
          templateUrl: 'app/tabReciboCaja.html',
                 controller : 'ReciboCajaController'
             }
         }
    })
    .state('app.registrotransaccion', {
      url: '/registrotransaccion',
      views: {
        'menuContent': {
          templateUrl: 'app/tabRegistroTransacciones.html',
                 controller : 'registroTransaccionesController'
             }
         }
    })
    .state('app.inventario', {
      url: '/inventario',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaInventario.html',
          controller: 'consultaInventarioController'
        }
      }
    })
    .state('app.detalleArticulo', {
      url: '/detalleArticulo',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleArticulo.html',
          controller : 'detalleArticulo'
        }
      }
    })
    .state('app.cartera', {
      url: '/cartera',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaCartera.html',
          controller : 'carteracontroller'
        }
      }
    })
    .state('app.detalleCartera', {
      url: '/detalleCartera',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleCartera.html',
          controller : 'detalleCarteracontroller'
        }
      }
    })
    .state('app.detalleDocumento', {
      url: '/detalleDocumento',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleDocumento.html',
          controller : 'controllerDetalleDocumento'
        }
      }
    })
    .state('app.detalleCliente', {
      url: '/detalleCliente',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleCliente.html',
          controller : 'controllerDetalleCliente'
        }
      }
    })
    .state('app.cuentas_por_pagar', {
      url: '/cuentas_por_pagar',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaProveedores.html',
          controller : 'controllerConsultaCuentasPorPagar'
        }
      }
    })
    .state('app.detalleProveedores', {
      url: '/detalleProveedores',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleProveedores.html',
          controller : 'controllerDetalleProveedor'
        }
      }
    })
    .state('app.consulta_transacciones', {
      url: '/consulta_transacciones',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaTransacciones.html',
          controller : 'controllerConsultaTransaccion'
        }
      }
    })
    .state('app.detalleTransacciones', {
      url: '/detalleTransacciones',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleTransacciones.html',
          controller : 'controllerDetalleMovimientos'
        }
      }
    })
    .state('app.inteligencia', {
      url: '/inteligencia',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaInteligencia.html',
          controller : 'controllerInteligencia'
        }
      }
    })
    .state('app.detalleInteligencia', {
      url: '/detalleInteligencia',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleInteligencia.html',
          controller : 'controllerDetalleInteligencia'
        }
      }
    })
    .state('app.balance', {
      url: '/balance',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaBalance.html',
          controller : 'controllerConsultaBalance'
        }
      }
    })
    .state('app.auxiliar', {
      url: '/auxiliar',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaAuxiliar.html',
          controller : 'controllerConsultaAuxiliar'
        }
      }
    })
    .state('app.estadoResultados', {
      url: '/estadoResultados',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaEstadoResultados.html',
          controller : 'controllerEstadoResultados'
        }
      }
    })
    //
    .state('app.mercadeo', {
      url: '/mercadeo',
      views: {
        'menuContent': {
          templateUrl: 'app/consultaMercadeo.html',
          controller : 'controllerConsultaMercadeo'
        }
      }
    })
    .state('app.detalleMercadeo', {
      url: '/detalleMercadeo',
      views: {
        'menuContent': {
          templateUrl: 'app/detalleMercadeo.html',
          controller : 'controllerDetalleMercadeo'
        }
      }
    })
    .state('app.agregarTarea', {
      url: '/agregarTarea',
      views: {
        'menuContent': {
          templateUrl: 'app/nuevaTarea.html',
          controller : 'controllerAgregarTarea'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/Login');
});
