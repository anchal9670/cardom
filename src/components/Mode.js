/*
  Supported values:
  {'development', 'staging', 'production'}
*/

const current_mode = "DEV";
module.exports = {
  mode: function () {
    return current_mode;
  },

  base_url: function () {
    var url = "";
    switch (current_mode) {
      case "DEV":
        url = `${process.env.REACT_APP_LOCAL_SERVER}`;
        break;
      case "PROD":
        url = `${process.env.REACT_APP_PRODUCTION_SERVER}`;
        break;
      default:
        url = "";
        break;
    }
    return url;
  },
};
