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
// last-modified: <2014-01-27 16:37:05 golden@golden-garage.net>
//

Template.errors.helpers({
    errors: function()
    {
        return Errors.find();
    }
});

Template.errors.rendered = function () 
{
    var error = this.data;

    Meteor.defer( 
        function ()
        {
            Errors.update( error._id, { $set: { see: true } } );
        }
    );
};
