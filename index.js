var request = require('request');
var currentAPIVersion = "1.0";

function Avalara(accountNumber, licenseKey, options) {
     if (typeof accountNumber !== "string" || typeof licenseKey !== "string") {
          throw new Error("Credentials not supplied for Avalara tax");
     }
     this.accountNumber = accountNumber;
     this.licenseKey = licenseKey;
     const basicAuth = "Basic " + new Buffer(this.accountNumber + ":" + this.licenseKey).toString("base64");
     options = options || {};
     options.development = options.development || false;
     options.version = options.version || currentAPIVersion;
     this.apiOptions = function() {
          const requestUrl = options.development ? 'https://development.avalara.net' : 'https://avatax.avalara.net';
          var requestOpt = {
               url: requestUrl + "/" + options.version + '/tax/get',
               method : 'POST',
               headers : {
                    "Authorization" : basicAuth
               }
          }
          return requestOpt;
     };
     this.options = options;
     return this;
}

Avalara.prototype.basicTaxCalculator = function (reqBody, cb) {
     var apiOptions = this.apiOptions();
     var postBody = JSON.stringify(reqBody);
     apiOptions.body = postBody;
     request(apiOptions, function(error, response, body){
          var responseObj = JSON.parse(response.body);
          if(responseObj.ResultCode == "Error") {
               cb(responseObj, null);
          } else {
               cb(null, responseObj);
          }
     });
}

Avalara.prototype.advanceTaxCalculator = function (reqBody, cb) {
     var apiOptions = this.apiOptions();
     var postBody = JSON.stringify(reqBody);
     apiOptions.body = postBody;
     request(apiOptions, function(error, response, body){
          var responseObj = JSON.parse(response.body);
          if(responseObj.ResultCode == "Error") {
               cb(responseObj, null);
          } else {
               cb(null, responseObj);
          }
     });
}

Avalara.prototype.estimateTax = function (reqBody, cb) {
     var apiOptions = this.apiOptions();
     var postBody = JSON.stringify(reqBody);
     var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");

     if( reg.exec(reqBody.body.latitude)  && reg.exec(reqBody.body.longitude)) {
          return true;
     } else {
          throw new Error("Invalid latitude && longitude");
          return false;
     }

     var apiOptions = {
          url: requestUrl + "/" + options.version + '/tax/' + reqBody.body.latitude + "," + reqBody.body.longitude + '/get?saleamount='+reqBody.body.amount,
          method : 'GET',
          headers : {
               "Authorization" : basicAuth
          }
     }
     request(apiOptions, function(error, response, body){
          var responseObj = JSON.parse(response.body);
          if(responseObj.ResultCode == "Error") {
               cb(responseObj, null);
          } else {
               cb(null, responseObj);
          }
     });
}

module.exports = Avalara;
