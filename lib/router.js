// lib/router.js
//
// Setup the Meteor application's routing using Iron Router.
//
//
// Provides:
//
//   default templates: 
//
//     layoutTemplate   - the application's default page layout (the picture frame)
//     loadingTemplate  - the application's loading page {{> spinner}}
//     notfoundTemplate - the application's not found page (for displaying undefined routes)
//
//
// Notes:
//
//   The Support Functions need to be located in the source before calls to Router.
//
//
// last-modified: <2014-01-25 13:13:23 golden@golden-garage.net>
//

// --- Support Functions ----------------------------------------------------------------------------------------------

// {{{ requireLogin()   - require login or render something else                                                    

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

// }}}


// --- Iron Router Configuration --------------------------------------------------------------------------------------

// {{{ Router.configure - layoutTemplate, loadingTemplate, notFoundTemplate; waitOn: notes                          

Router.configure(
{
     layoutTemplate: 'layout',
    loadingTemplate: 'loading',
   notFoundTemplate: 'notfound',

    waitOn:  function () { return Meteor.subscribe( 'notes' ); }
});

// }}}
// {{{ Router.map       - notesList, noteDetail, noteCreate, noteEdit                                               

Router.map( 
    function ()
    {
        this.route( 'notesList', 
                    { 
                            path: '/',
                        template: 'notesList'
                    });

        this.route( 'noteDetail',  
                    { 
                            path: '/notes/:_id',
                        template: 'noteDetail',

                        data: function() 
                        { 
                            return Notes.findOne( this.params._id );            
                        }
                    });

        this.route( 'noteCreate',  
                    { 
                            path: '/note-create',
                        template: 'noteCreate'
                    });

        this.route( 'noteEdit',  
                    { 
                            path: '/note-edit/:_id',
                        template: 'noteEdit',

                        data: function() 
                        { 
                            return Notes.findOne( this.params._id );            
                        },

                        before: requireLogin
                    });

    });

// }}}
