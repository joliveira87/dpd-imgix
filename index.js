/**
 * Module dependencies
 */

var Resource = require('deployd/lib/resource');
var util = require('util');
var path = require('path');
var async = require('async');
var urlParser = require("url");
var crypto = require("crypto");

/**
 * Module setup.
 */

function Imgix( options ) {
  Resource.apply(this, arguments);
}

util.inherits(Imgix, Resource);

Imgix.prototype.clientGeneration = true;

Imgix.basicDashboard = {

  settings: [{
    "name": "Domain",
    "type": "text",
    "description": "Imgix Domain"
  },
  {
    "name": "Token",
    "type": "text",
    "description": "Secure Url Token"
  }]

};

/**
 * Module methodes
 */

Imgix.prototype.handle = function (ctx, next) {

  // just accepts one post 
  if ( ctx.req && ctx.req.method !== 'POST' ) {
    return next();
  }

  var options = ctx.body;

  if (!this.config.Domain || !this.config.Token)
    return ctx.done("Domain or Token not defined");

  if (!options && !options.photo && !options.photos)
    return ctx.done(null, {"data" : {}});

  if (options.photos && (!options.photos[0] || (typeof options.photos[0] !== "string")))
    return ctx.done(null, {"data" : {}});

  if (options.photo && typeof options.photo !== "string")
    return ctx.done(null, {"data" : {}});

  if (!options.properties) options.properties = {};

  var result;

  if (options.photo) {
  
    result = imgixUrl(this.config.Token, this.config.Domain, options.photo, options.properties);
  
  } else if (options.photos) {

    result = [];

    for (var i = 0; i < options.photos.length; i++) {
      result.push(imgixUrl(this.config.Token, this.config.Domain, options.photos[i], options.properties));
    }

  }

  return ctx.done(null, {"data" : result});

};

/**
 * imgixUrl
 * create imgix url
 */

function imgixUrl (token, host, photo, options) {

  var query = arrangeOptions(options);

  var url = host + photo + query;

  return generateSignUrl(token, url);

}

/**
 * arrangeOptions
 * form one query string according to the properties used
 *
 * {param} Object options
 */

function arrangeOptions (options) {

  var query = "";

  if (!options || (typeof options !== "object")) return query;

  if (Object.keys(options).length > 0)
    query = "?";

  for (var key in options)
    query += key + "=" + options[key] + "&";

  query = query.slice(0, -1);

  return query;

}

/**
 * generateSignUrl
 * generates the signed imgix url
 */

function generateSignUrl (token, url) {

  // parse url
  var parsedUrl = urlParser.parse(url, true, true);

  // Build the signing value
  var signvalue = token + parsedUrl.path;

  // Calculate MD5 of the signing value.
  var signature = crypto.createHash('md5').update(signvalue).digest('hex');
  // var signature = md5Hash.digest("hex");

  // Determine the delimiter for appending the signature.
  var delimiter = parsedUrl.search ? "&" : "?";

  // Add the signature to the url and return.
  return url + delimiter + "s=" + signature;

}

/**
 * Module export
 */

module.exports = Imgix;