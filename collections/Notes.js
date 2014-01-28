// collections/Notes.js
//
// 
// The definition of the Notes collection.
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
// last-modified: <2014-01-27 11:18:14 golden@golden-garage.net>
//

Notes = new Meteor.Collection( 'notes' );

Notes.allow({
    insert: function ( userId, doc ) { return !! userId; },
    update: function ( userId, doc ) { return doc && doc.userId === userId; },
    remove: function ( userId, doc ) { return doc && doc.userId === userId; }
});

Notes.deny({
    update: function( userId, attrNames ) { return _.without( attrNames, 'url', 'title' ).length > 0; }
});
