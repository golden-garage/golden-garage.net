// client/views/notes.js
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
// last-modified: <2014-01-23 12:19:28 golden@golden-garage.net>
//
var notesData = [
    {
        author: 'Sacha Greif',
         title: 'Introducing Telescope',
           url: 'http://sachagreif.com/introducing-telescope/'
    }, 
    {
        author: 'Tom Coleman',
         title: 'Meteor',
           url: 'http://meteor.com'
    }, 
    {
        author: 'Tom Coleman',
         title: 'The Meteor Book',
           url: 'http://themeteorbook.com'
    }
];

Template.notes.helpers( { notes: notesData } );
