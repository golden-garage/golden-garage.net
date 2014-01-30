// client/views/application/header.js
//
// 
// The Meteor template helper for header.html.
//
// Provides:
//
//   {{#whenLoggedIn}}            - conditional block displayed when user is logged in
//   {{#whenLoggedInAt}} - conditional block displayed when user is logged in
//
//               notes[]    - an array of notes
//                 .author  - the note's author
//                 .title   - the notes title
//                 .url     - the note's reference URL
//
//
// last-modified: <2014-01-28 22:25:02 golden@golden-garage.net>
//

Template.header.whenLoggedIn = function ( options, data )
{
    if ( Meteor.user() ) 
    { 
        return options.fn( this ); 
    } 
    else 
    { 
        return options.inverse( this );
    }
}

Template.header.whenLoggedInAt = function ( routeName, options )
{
    if ( Meteor.user() && Router.current().route.name === routeName )
    { 
        return options.fn( this ); 
    }  
    else 
    { 
        return options.inverse( this ); 
    }
}

Template.header.whenLoggedInStartsWith = function ( routeName, options )
{
    var                name = Router.current().route.name;
    var             matches = name    && name.match( new RegExp( "^"+ routeName ) );
    var startsWithRouteName = matches && matches.length > 0;

    if ( Meteor.user() && startsWithRouteName )
    { 
        return options.fn( this ); 
    }  
    else 
    { 
        return options.inverse( this ); 
    }
}

Template.header.helpers({

    activeRouteClass: function ( routeName )
    {
        return Router.current().route.name === routeName ? "active" : "";
    }
});

