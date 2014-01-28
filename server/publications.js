// server/publications.js
//
// Setup the Meteor publications (control client visibility of server data).
//
// Provides:
//
//   notes       - the entire Notes       collection
//   leakageData - the entire LeakageData collection
//
//
// last-modified: <2014-01-27 12:55:31 golden@golden-garage.net>
//

Meteor.publish( 'notes', 

                function () 
                {
                    return Notes.find();
                }
              );

Meteor.publish( 'leakageData', 

                function () 
                {
                    return LeakageData.find();
                }
              );
