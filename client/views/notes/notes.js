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
// last-modified: <2014-01-24 12:31:19 golden@golden-garage.net>
//


Template.notes.helpers( 
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
