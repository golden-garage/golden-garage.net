// client/collections/Errors.js
//
// 
// The definition of the client-side only Errors collection.
//
// 
// Provides:
//
//   Errors - the Errors collection
//
//
// last-modified: <2014-01-27 16:32:58 golden@golden-garage.net>
//

Errors = new Meteor.Collection( null );

throwError = function( message )
{
    Errors.insert( { message: message, seen: false } );
}

clearErrors = function() 
{
    Errors.remove( { seen: true } );
}