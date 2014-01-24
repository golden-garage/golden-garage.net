// server/publications.js
//
// Setup the Meteor publications (control client visibility of server data).
//
// Provides:
//
//   notes - the entire notes collection
//
//
// last-modified: <2014-01-23 14:12:29 golden@golden-garage.net>
//
Meteor.publish( 'notes', 

                function () 
                {
                    return Notes.find();
                }
              );
