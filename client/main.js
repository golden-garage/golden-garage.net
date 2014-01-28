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
// last-modified: <2014-01-27 22:05:00 golden@golden-garage.net>
//

Meteor.subscribe( 'notes'               );
Meteor.subscribe( 'leakageData'         );
Meteor.subscribe( 'filteredLeakageData' );


// initialize session

Session.set( 'leakageData.networkFilter',   [ "I", "O" ] );
Session.set( 'leakageData.patientFilter',   [ "M", "U" ] );
Session.set( 'leakageData.physicianFilter', [ "E", "A" ] );
Session.set( 'leakageData.serviceFilter',   [ "O", "N" ] );
