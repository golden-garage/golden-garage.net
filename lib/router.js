// lib/router.js
//
// Setup the Meteor application's routing.
//
// Provides:
//
//   notes - the entire notes collection
//
//
// last-modified: <2014-01-24 13:27:00 golden@golden-garage.net>
//

Router.configure(
{
     layoutTemplate: 'layout',
    loadingTemplate: 'loading',
   notFoundTemplate: 'loading',

    waitOn:  function () { return Meteor.subscribe( 'notes' ); }
});

Router.map( 
    function ()
    {
        // require login or render something else
        var requireLogin = function ()
        {
            // if the user is not logged in, render something else
            if ( ! Meteor.user() )
            {
                // if the user is in the process of logging in
                if ( Meteor.loggingIn() ) 
                {
                    // display the loading template
                    this.render( 'loading' );
                }
                else 
                {
                    // display the accessed denied template
                    this.render( 'accessDenied' );
                }

                // stop rendering this template
                this.stop();
            }
        }

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

        this.route( 'noteEdit',  
                    { 
                        path: '/note-edit/:_id',

                        data: function() 
                        { 
                            return Notes.findOne( this.params._id );            
                        },

                        before: requireLogin
                    });

    });
