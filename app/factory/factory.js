angular.module('app').factory('Utils', [
    '$rootScope',
    '$window',
    '$state',
    '$rootScope',
    function UtilsFactory(
      $rootScope,
      $window,
      $state,
      $rootScope
    ) {
      return {
        openFile: function (url) {
          $window.open(url, '_blank');
        },
        removeEmpty: function (obj, { recursive } = { recursive: true }) {
          const newObj = {};
          Object.keys(obj).forEach(key => {
            if (obj[key] && typeof obj[key] === 'object' && recursive) {
              newObj[key] = this.removeEmpty(obj[key]); // recurse
            } else if (obj[key] != null) {
              newObj[key] = obj[key]; // copy value
            }
          });
          return newObj;
        },
        mediumDate: function (date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
  
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
  
          return [year, month, day].join('-');
        },
        fromJsonToFormData(obj, form, namespace, k) {
          let Helpers = this;
          const keys = k || Object.keys(obj);
          // Array(n).join(".").split(".");
  
          const fd = form || new FormData();
          let formKey;
  
          // for(var property in obj) {
          for (let i = 0; i < keys.length; i += 1) {
            //   if(obj.hasOwnProperty(obj[keys[i]])) {
            if (namespace) {
              formKey = `${namespace}[${keys[i].match(/^[0-9]+$/) !== null ? '' : keys[i]}]`;
            } else {
              formKey = keys[i];
            }
  
            if (
              typeof obj[keys[i]] === 'object' &&
              !(obj[keys[i]] instanceof File)
            ) {
              Helpers.fromJsonToFormData(
                obj[keys[i]],
                fd,
                formKey,
                Object.keys(obj[keys[i]])
              );
            } else if (obj[keys[i]] instanceof File) {
              // if it's a string or a File object
              fd.append(formKey, obj[keys[i]], obj[keys[i].name]);
            } else {
              fd.append(formKey, obj[keys[i]]);
            }
            //   }
          }
  
          return fd;
        },
        goToState: function ({ name, params = {}, options = {}, broadcast = null }) {
          $state.go(name, params, options);
          if (broadcast) $rootScope.$broadcast(broadcast.action, broadcast.data);
        },
        unformatAddress: function (object, address) {
          var infosplit = address.split(/-|_|#|:/);
          if (infosplit.length > 1) {
            object.composed_address = {}
            object.composed_address.a1 = infosplit[0];
            object.composed_address.a2 = infosplit[1];
            object.composed_address.a3 = infosplit[2];
            object.composed_address.a4 = infosplit[3];
            object.composed_address.a5 = infosplit[4];
          } else {
            object.composed_address.a5 = address;
          }
        },
        concatAddress: function (object, key, composed_address) {
          object[key] = `${composed_address.a1}_${composed_address.a2}#${composed_address.a3}-${composed_address.a4}:${composed_address.a5}`
          object[key] = object.replaceAll('undefined', '');
          object[key] = object.replaceAll('null', '');
        },
        selectedCountry: function (
          participant,
          {natural} = {natural: false}
        ) {
          if (participant.country != 'COLOMBIA' && natural) {
            participant.natural.strata = 'NO INFORMA';
          }
          participant.a1 = null;
          participant.a2 = null;
          participant.a3 = null;
          participant.a4 = null;
          participant.a5 = null;
          participant.department = null;
          participant.city = null;
          participant.address = null;
        }
      }
    }
  ])