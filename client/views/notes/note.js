// client/views/note.js
// 
//
// The Meteor template helper for note.html.
//
//
// Requires:
//
//   this       - the note
//   this.url   - the note's URL
//
//
// Provides:
//
//   {{domain}} - the domain name of the note's URL
//
//
// last-modified: <2014-01-23 11:57:32 golden@golden-garage.net>
//
Template.note.helpers( 
{
    domain: function() 
    {
        var a = document.createElement( 'a' );

        a.href = this.url;

        return a.hostname;
    }
});
