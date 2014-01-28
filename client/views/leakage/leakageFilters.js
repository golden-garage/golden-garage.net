// client/views/leakage/leakageFilters.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-27 22:05:45 golden@golden-garage.net>
//

Template.leakageFilterPatient.events({

    'click input': function ( event )
    {
        var cb            = event.srcElement;
        var checked       = cb.checked;
        var value         = cb.value;

        var patientFilter = Session.get( 'leakageData.patientFilter' );

        if ( checked )
        {
            patientFilter = _.union( patientFilter, value );
        }
        else
        {
            patientFilter = _.without( patientFilter, value );
        }

        Session.set( 'leakageData.patientFilter', patientFilter );
    }
});

Template.leakageFilterPatient.helpers({

    isCheckedPatient:   function ( value ) 
    {
        return _.contains( Session.get( "leakageData.patientFilter" ), value ) ? "checked" : "";
    }
});

Template.leakageFilterPhysician.events({

    'click input': function ( event )
    {
        var cb            = event.srcElement;
        var checked       = cb.checked;
        var value         = cb.value;

        var physicianFilter = Session.get( 'leakageData.physicianFilter' );

        if ( checked )
        {
            physicianFilter = _.union( physicianFilter, value );
        }
        else
        {
            physicianFilter = _.without( physicianFilter, value );
        }

        Session.set( 'leakageData.physicianFilter', physicianFilter );
    }
});

Template.leakageFilterPhysician.helpers({

    isCheckedPhysician:   function ( value ) 
    {
        return _.contains( Session.get( "leakageData.physicianFilter" ), value ) ? "checked" : "";
    }
});

Template.leakageFilterService.events({

    'click input': function ( event )
    {
        var cb            = event.srcElement;
        var checked       = cb.checked;
        var value         = cb.value;

        var serviceFilter = Session.get( 'leakageData.serviceFilter' );

        if ( checked )
        {
            serviceFilter = _.union( serviceFilter, value );
        }
        else
        {
            serviceFilter = _.without( serviceFilter, value );
        }

        Session.set( 'leakageData.serviceFilter', serviceFilter );
    }
});

Template.leakageFilterService.helpers({

    isCheckedService:   function ( value ) 
    {
        return _.contains( Session.get( "leakageData.serviceFilter" ), value ) ? "checked" : "";
    }
});

