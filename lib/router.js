// lib/router.js
//
// Setup the Meteor application's routing.
//
// Provides:
//
//   notes - the entire notes collection
//
//
// last-modified: <2014-01-23 21:04:56 golden@golden-garage.net>
//
Router.configure(
{
     layoutTemplate: 'layout',
    loadingTemplate: 'loading',

    waitOn:  function () { return Meteor.subscribe( 'notes' ); }
});

Router.map( 
    function ()
    {
        this.route( 'notes', 
                    { 
                        path: '/'
                    });

        this.route( 'note',  
                    { 
                        path: '/notes/:_id',

                        data: function() 
                        { 
                            return Notes.findOne( this.params._id );            
                        }
                    });

        this.route( 'noteCreate',  
                    { 
                        path: '/note-create'
                    });
    }
);

var requireLogin = function()
{
    if ( ! Meteor.user() )
    {
        this.render( 'accessDenied' );
        this.stop();
    }
}

Router.before( requireLogin, { only: 'noteCreate' } );
