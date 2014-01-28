// client/main.js
//
// Setup the Meteor client (subscribe to server data) and user Session.
//
// Provides:
//
//   notes       - the entire Notes       collection
//   leakageData - the entire LeakageData collection
//
//
// last-modified: <2014-01-27 12:59:38 golden@golden-garage.net>
//

Meteor.subscribe( 'notes'       );
Meteor.subscribe( 'leakageData' );
