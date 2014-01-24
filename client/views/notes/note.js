// client/views/notes/note.js
//
// 
// The Meteor template helper for note.html.
//
// Provides:
//
//   'submit form' - event handler
//
//
// last-modified: <2014-01-24 12:43:13 golden@golden-garage.net>
//


Template.noteCreate.events( 
    {
        'submit form': function ( event )
        {
            event.preventDefault();
            
            var note = 
                {
                    message: $(event.target).find( '[name=message]' ).val(),
                      title: $(event.target).find( '[name=title]'   ).val(),
                        url: $(event.target).find( '[name=url]'     ).val()
                };

            Meteor.call( 'create', note, function( error, id )
                         {
                             if ( error ) return alert( error.reason );

                             Router.go( 'notes' );
                         });
        }
    });

Template.noteEdit.events( 
    {
        'submit form': function ( event )
        {
            event.preventDefault();
            
            var noteId = this._id;
            
            var note = 
                {
                        _id: noteId,
                      title: $(event.target).find( '[name=title]'   ).val(),
                        url: $(event.target).find( '[name=url]'     ).val()
                };

            Meteor.call( 'update', note, function( error, id )
                         {
                             if ( error ) return alert( error.reason );

                             Router.go( 'notes' );
                         });
        },

        'click .delete': function ( event )
        {
            event.preventDefault();
            
            var currentNoteId = this._id;
            
            var note = 
                {
                        _id: this._id,
                      title: $(event.target).find( '[name=title]'   ).val(),
                        url: $(event.target).find( '[name=url]'     ).val()
                };

            Meteor.call( 'delete', note, function( error )
                         {
                             if ( error ) return alert( error.reason );

                             Router.go( 'notes' );
                         });
        }
    });
