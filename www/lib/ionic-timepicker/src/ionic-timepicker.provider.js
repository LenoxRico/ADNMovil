angular.module('ionic-timepicker.provider', [])

  .provider('ionicTimePicker', function () {

    var config = {
      setLabel: 'Aplicar',
      closeLabel: 'Cerrar',
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 1
    };

    this.configTimePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    this.$get = ['$rootScope', '$ionicPopup', function ($rootScope, $ionicPopup) {

      var provider = {};
      var $rootScope = $rootScope.$new();
      $rootScope.today = resetHMSM(new Date()).getTime();
      $rootScope.time = {};

      //Reset the hours, minutes, seconds and milli seconds
      function resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      }


      //Increasing the hours
      $rootScope.increaseHours = function () {
        $rootScope.time.hours = Number($rootScope.time.hours);
        if ($rootScope.mainObj.format == 12) {
          if ($rootScope.time.hours != 12) {
            $rootScope.time.hours += 1;
          } else {
            $rootScope.time.hours = 1;
          }
        }
        if ($rootScope.mainObj.format == 24) {
          $rootScope.time.hours = ($rootScope.time.hours + 1) % 24;
        }
        $rootScope.time.hours = ($rootScope.time.hours < 10) ? ('0' + $rootScope.time.hours) : $rootScope.time.hours;
      };

      //Decreasing the hours
      $rootScope.decreaseHours = function () {
        $rootScope.time.hours = Number($rootScope.time.hours);
        if ($rootScope.mainObj.format == 12) {
          if ($rootScope.time.hours > 1) {
            $rootScope.time.hours -= 1;
          } else {
            $rootScope.time.hours = 12;
          }
        }
        if ($rootScope.mainObj.format == 24) {
          $rootScope.time.hours = ($rootScope.time.hours + 23) % 24;
        }
        $rootScope.time.hours = ($rootScope.time.hours < 10) ? ('0' + $rootScope.time.hours) : $rootScope.time.hours;
      };

      //Increasing the minutes
      $rootScope.increaseMinutes = function () {
        $rootScope.time.minutes = Number($rootScope.time.minutes);
        $rootScope.time.minutes = ($rootScope.time.minutes + $rootScope.mainObj.step) % 60;
        $rootScope.time.minutes = ($rootScope.time.minutes < 10) ? ('0' + $rootScope.time.minutes) : $rootScope.time.minutes;
      };

      //Decreasing the minutes
      $rootScope.decreaseMinutes = function () {
        $rootScope.time.minutes = Number($rootScope.time.minutes);
        $rootScope.time.minutes = ($rootScope.time.minutes + (60 - $rootScope.mainObj.step)) % 60;
        $rootScope.time.minutes = ($rootScope.time.minutes < 10) ? ('0' + $rootScope.time.minutes) : $rootScope.time.minutes;
      };

      //Changing the meridian
      $rootScope.changeMeridian = function () {
        $rootScope.time.meridian = ($rootScope.time.meridian === "AM") ? "PM" : "AM";
      };

      function setMinSecs(ipTime, format) {
        $rootScope.time.hours = Math.floor(ipTime / (60 * 60));

        var rem = ipTime % (60 * 60);
        if (format == 12) {
          if ($rootScope.time.hours >= 12) {
            $rootScope.time.meridian = 'PM';

            if($rootScope.time.hours > 12){
              $rootScope.time.hours -= 12;
            }
          }
           else {
            $rootScope.time.meridian = 'AM';
          }
        }

        if ($rootScope.time.hours === 0) {
          $rootScope.time.hours = 12;
        }

        $rootScope.time.minutes = rem / 60;

        $rootScope.time.hours = Math.floor($rootScope.time.hours);
        $rootScope.time.minutes = Math.floor($rootScope.time.minutes);

        if ($rootScope.time.hours.toString().length == 1) {
          $rootScope.time.hours = '0' + $rootScope.time.hours;
        }
        if ($scorootScopepe.time.minutes.toString().length == 1) {
          $rootScope.time.minutes = '0' + $rootScope.time.minutes;
        }
        $rootScope.time.format = $rootScope.mainObj.format;
      }

      provider.openTimePicker = function (ipObj) {
        var buttons = [];
        $rootScope.mainObj = angular.extend({}, config, ipObj);
        setMinSecs($rootScope.mainObj.inputTime, $rootScope.mainObj.format);

        buttons.push({
          text: $rootScope.mainObj.setLabel,
          type: 'button_set',
          onTap: function (e) {
            var totalSec = 0;

            if ($rootScope.time.format == 12) {
              $rootScope.time.hours = Number($rootScope.time.hours);
              if ($rootScope.time.meridian == 'PM' && $rootScope.time.hours != 12) {
                $rootScope.time.hours += 12;
              } else if ($rootScope.time.meridian == 'AM' && $rootScope.time.hours == 12) {
                $rootScope.time.hours -= 12;
              }
              totalSec = ($rootScope.time.hours * 60 * 60) + ($rootScope.time.minutes * 60);
            } else {
              totalSec = ($rootScope.time.hours * 60 * 60) + ($rootScope.time.minutes * 60);
            }
            $rootScope.mainObj.callback(totalSec);
          }
        });

        buttons.push({
          text: $rootScope.mainObj.closeLabel,
          type: 'button_close'
        });

        $rootScope.popup = $ionicPopup.show({
          templateUrl: 'ionic-timepicker.html',
          scope: $rootScope,
          cssClass: 'ionic_timepicker_popup',
          buttons: buttons
        });

      };

      return provider;

    }];

  });
