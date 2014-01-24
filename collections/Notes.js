// collections/notes.js
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
// last-modified: <2014-01-24 09:03:00 golden@golden-garage.net>
//

Notes = new Meteor.Collection( 'notes' );

Notes.allow({

    insert: function ( userId, doc )
    {
        return !! userId;
    }
});

Meteor.methods({

    create: function ( attrs )
    {
        var user = Meteor.user();

        // REQ: user must be signed in to create a note
        if ( ! user ) throw new Meteor.Error( 401, "You need to Sign In to create a note." );

        // REQ: url must be unique
        if ( attrs.url )
        {
            var existingNote = Notes.findOne( { url: attrs.url } );
            
            if ( existingNote ) throw new Meteor.Error( 302, "That URL already exists.", existingNote._id );
        }
            
        // REQ: note must have a title
        if ( ! attrs.title ) throw new Meteor.Error( 422, "Please include a title." );

        
        var filteredAttrs = _.pick( attrs, "url", "title", "message" );

        var note = _.extend( filteredAttrs, { 

            userId: user._id,
            author: user.username,
            created: new Date().getTime()
        });

        var noteId = Notes.insert( note );

        return noteId;
    }
});
