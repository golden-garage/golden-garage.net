// client/views/leakage/leakageFilters.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-28 16:23:32 golden@golden-garage.net>
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

Template.leakageFilterDates.helpers({

    minMonth: function ()
    {
        return Session.get( "leakageData.minMonth" );
    },

    maxMonth: function ()
    {
        return Session.get( "leakageData.maxMonth" );
    },

    startMonths: function ()
    {
        var minDate = Session.get( "leakageData.minDate" );
        var maxDate = Session.get( "leakageData.maxDate" );

        var months = [];

        var min = moment( minDate ).startOf( "month" );
        var max = moment( maxDate ).endOf(   "month" );

        for ( var m = moment( min ); m < max; m.add( 1, "month" ) )
        {
            var month = m.format( 'YYYY-MM' );

            var isSelected = month === Session.get( "leakageFilterDates.selectedStartMonth" );

            months.push( {     date: m.toISOString(), 
                              month: month, 
                           selected: isSelected ? "selected" : "", 
                              label: month } );
        }

        return months;
    },

    endMonths: function ()
    {
        var minDate = Session.get( "leakageData.minDate" );
        var maxDate = Session.get( "leakageData.maxDate" );

        var months  = [];

        var min     = moment( minDate ).startOf( "month" );
        var max     = moment( maxDate ).endOf(   "month" );

        for ( var m = moment( min ); m < max; m.add( 1, "month" ) )
        {
            var month = m.format( 'YYYY-MM' );

            var isSelected = month === Session.get( "leakageFilterDates.selectedEndMonth" );

            months.push( {     date: m.toISOString(), 
                              month: month,
                           selected: isSelected ? "selected" : "", 
                              label: month } );
        }

        return months;
    },

});

Template.leakageFilterDates.events({

    'change #leakageFilterDatesStart': function ( event )
    {
        var startDate  = new Date( event.srcElement.value );
        var startMonth = moment( startDate ).format( "YYYY-MM" );

        Session.set( "leakageFilterDates.selectedStartDate",  startDate  );
        Session.set( "leakageFilterDates.selectedStartMonth", startMonth );
    },

    'change #leakageFilterDatesEnd': function ( event )
    {
        var endDate  = new Date( event.srcElement.value );
        var endMonth = moment( endDate ).format( "YYYY-MM" );

        Session.set( "leakageFilterDates.selectedEndDate",  endDate  );
        Session.set( "leakageFilterDates.selectedEndMonth", endMonth );
    },
});
