/**
 * Module dependencies
 */

var Resource = require('deployd/lib/resource');
var util = require('util');
var path = require('path');
var async = require('async');
var crypto = require('crypto');

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

Imgix.prototype.handle = function ( ctx, next ) {

	// just accepts one post 
	if ( ctx.req && ctx.req.method !== 'POST' ) {
		return next();
	}

	var options = ctx.body;
	console.log("CONFIGURATIONS");
	console.log(this.config);
	console.log("OPTIONS");
	console.log(options);

	return ctx.done(null, {"message" : "This is working man!!!"});
  // if ( !ctx.req.internal && this.config.internalOnly ) {
  //   return ctx.done({ statusCode: 403, message: 'Forbidden' });
  // }

  // var options = ctx.body || {};
  // options.from = options.from || this.config.defaultFromAddress;
  // options.template = options.template || this.config.defaultTemplate;

  // var errors = {};
  // if ( !options.to ) {
  //   errors.to = '\'to\' is required';
  // }
  // if ( !options.from ) {
  //   errors.from = '\'from\' is required';
  // }
  // if ( !options.text ) {
  //   errors.text = '\'text\' is required';
  // }
  // if ( Object.keys(errors).length ) {
  //   return ctx.done({ statusCode: 400, errors: errors });
  // }

  // var that = this;

  // async.waterfall([
  //   function ( callback ) {
  //     if ( options.template ) {
  //       return emailTemplates( templatesDir, callback );
  //     }
  //     callback( null, null );
  //   },
  //   function ( template, callback ) {
  //     if ( template ) {
  //       return template( options.template, options.locals, callback );
  //     }
  //     callback( null, null, null );
  //   }
  // ],
  // function( err, html, text ) {
  //   if ( err ) {
  //     console.log( err );
  //   }
  //   if ( html ) {
  //     options.html = html;
  //   }
  //   if ( text ) {
  //     // grab text from templating engine
  //     options.text = text;
  //   }

  //   if ( that.config.productionOnly && that.options.server.options.env == 'development' ) {
  //     console.log();
  //     console.log('Sent email:');
  //     console.log('From:    ', options.from);
  //     console.log('To:      ', options.to);
  //     console.log('Subject: ', options.subject);
  //     console.log('Text:');
  //     console.log( options.text );
  //     console.log('HTML:');
  //     console.log( options.html );
  //     return ctx.done( null, { message : 'Simulated sending' } );
  //   }

  //   that.transport.sendMail(
  //     options,
  //     function( err, response ) {
  //       if ( err ) {
  //         return ctx.done( err );
  //       }
  //       ctx.done( null, { message : response.message } );
  //     }
  //   );

  // });

};

/**
 * Module export
 */

module.exports = Imgix;