// client/views/application/errors.js
//
// 
// The Meteor template helper for errors.html.
//
// Provides:
//
//   {{errors}} - a list of application errors
//
//
// last-modified: <2014-01-27 13:44:01 golden@golden-garage.net>
//

Template.errors.helpers({
    errors: function()
    {
        return Errors.find();
    }
});
