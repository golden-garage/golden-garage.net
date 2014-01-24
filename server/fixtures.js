// server/fixtures.js
//
// Setup the Meteor collections (when the collections are emtpy).
//
// Provides:
//
//   Notes - the notes collection
//
//
// last-modified: <2014-01-24 11:28:49 golden@golden-garage.net>
//

if ( Notes.find().count() === 0 ) 
{
    Notes.insert({
        author: 'Sacha Greif',
         title: 'Introducing Telescope',
           url: 'http://sachagreif.com/introducing-telescope/'
    });
    
    Notes.insert({
        author: 'Tom Coleman',
         title: 'Meteor',
           url: 'http://meteor.com'
    });
    
    Notes.insert({
        author: 'Tom Coleman',
         title: 'The Meteor Book',
           url: 'http://themeteorbook.com'
    });
}

/*
if ( Users.find().count() === 0 )
{
    Accounts.createUser({
        username: 'golden',
           email: 'golden@golden-garage.net',
        password: 'setst',
         profile: {
            name: 'Rick Golden'
        }
    });
}
*/