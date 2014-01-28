// client/views/leakage/leakageFilters.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-27 16:04:58 golden@golden-garage.net>
//

Template.leakageFilterPatient.events({

    'click input': function ( event )
    {
        event.preventDefault();
        
        throwError( "foo!" );
    }
});

