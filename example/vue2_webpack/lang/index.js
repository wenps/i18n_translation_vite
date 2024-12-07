(function () {
    let $t = function (key, val, nameSpace) {
      const langPackage = $t[nameSpace] ? $t[nameSpace] : $t.package
      return (langPackage || {})[key] || val;
    };
    let $$t = function (val) {
      return val;
    };
    $t.locale = function (locale, nameSpace) {
      if (nameSpace) {
        $t[nameSpace] = locale || {};
      } else {
        $t.package = locale || {};
      }
    };
    window.$t = window.$t || $t;
    window.$$t = $$t;
    window._getJSONKey = function (key, insertJSONObj = undefined) {
      const JSONObj = insertJSONObj
      const langObj = {}
      Object.keys(JSONObj).forEach((value)=>{
        langObj[value] = JSONObj[value][key]
      })
      return langObj
    }
  })();