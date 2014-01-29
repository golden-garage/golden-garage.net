// collections/methods.js
//
// 
// The definition of the Meteor methods.
//
// Provides:
//
//
//
// last-modified: <2014-01-28 08:54:37 golden@golden-garage.net>
//

Meteor.methods({

    totalLeakage: function ( attrs )
    {
        
    },

    createNote: function ( attrs )
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
            
        // REQ: must have a title
        if ( ! attrs.title ) throw new Meteor.Error( 422, "Please include a title." );

        // REQ: created Note may only have these values
        var filteredAttrs = _.pick( attrs, "url", "title", "message" );

        // add server-side attributes to Note
        var note = _.extend( filteredAttrs, { 

             author: user.username,
            created: new Date().getTime(),
             userId: user._id
        });

        var noteId = Notes.insert( note );

        return noteId;
    },

    updateNote: function ( attrs )
    {
        var noteId = attrs._id;

        // REQ: a Note may only update these values
        var filteredAttrs = _.pick( attrs, "url", "title" );

        Notes.update( noteId, { $set: filteredAttrs }, 
                      function ( error )
                      {
                          if ( error ) throw new Meteor.Error( 400, error.reason );
                      });
    },

    deleteNote: function ( attrs )
    {
        var noteId = attrs._id;

        Notes.remove( noteId );
    }
});
