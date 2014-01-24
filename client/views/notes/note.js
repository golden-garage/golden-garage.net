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
// last-modified: <2014-01-24 09:28:42 golden@golden-garage.net>
//


Template.noteCreate.events( 
    {
        'submit form': function (e)
        {
            e.preventDefault();
            
            var note = 
                {
                    message: $(e.target).find( '[name=message]' ).val(),
                      title: $(e.target).find( '[name=title]'   ).val(),
                        url: $(e.target).find( '[name=url]'     ).val()
                };

            Meteor.call( 'create', note, function( error, id )
                         {
                             if ( error ) return alert( error.reason );

                             Router.go( 'note', { _id: id } );
                         });
        }
    });
