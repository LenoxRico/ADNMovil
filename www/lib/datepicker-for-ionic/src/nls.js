(function() {

  'use strict';

  angular
  .module('ionic-datepicker')
  .service('DatepickerNls', function () {

    var nls = {
      'en-us': {
        weekdays: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        months: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
      },
      'pt-br': {
        weekdays: [ 'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado' ],
        months: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
      }
    };

    this.getWeekdays = function(locale) {
      return this._getNls(locale).weekdays;
    };

    this.getMonths = function(locale) {
      return this._getNls(locale).months;
    };

    this._getNls = function(locale) {
      return nls[locale] || nls['en-us'];
    };

  });

})();
