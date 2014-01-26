// client/views/notes/notes.js
//
// 
// The Meteor template helper for notes.html.
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
// last-modified: <2014-01-25 12:46:28 golden@golden-garage.net>
//


Template.notesList.helpers( 
    { 
        notes: function () 
        { 
            return Notes.find( {}, { sort: { created: -1 } } ); 
        } 
    });


Template.notesEach.helpers( 
    {
        domain: function() 
        {
            var a = document.createElement( 'a' );
            
            a.href = this.url;
            
            return a.hostname;
        },

        ownNote: function()
        {
            return this.userId === Meteor.userId();
        }
    });

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

                             Router.go( 'notesList' );
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

                             Router.go( 'notesList' );
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

                             Router.go( 'notesList' );
                         });
        }
    });
