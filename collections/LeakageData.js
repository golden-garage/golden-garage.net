// collections/LeakageData.js
//
// 
// The definition of the Meteor collection for notes.
//
// Provides:
//
//   {{notes}} - the notes data
//
//               notes[]    - an array of notes
//                 .author  - the note's author
//                 .title   - the notes title
//                 .url     - the note's reference URL
//
//
// last-modified: <2014-01-27 12:58:49 golden@golden-garage.net>
//

LeakageData = new Meteor.Collection( 'leakageData' );

LeakageData.allow({
    // insert: function ( userId, doc ) { return !! userId; },
    // update: function ( userId, doc ) { return !! userId; },
    // remove: function ( userId, doc ) { return !! userId; }
});

LeakageData.deny({
    // update: function( userId, attrNames ) { return true; }
});

