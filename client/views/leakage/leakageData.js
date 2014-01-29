// client/views/leakage/leakage.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-28 18:29:46 golden@golden-garage.net>
//

Template.leakageData.helpers({ 

    leakageData: function ()
    {
        var patientFilter   = Session.get( 'leakageData.patientFilter'   );
        var physicianFilter = Session.get( 'leakageData.physicianFilter' );
        var serviceFilter   = Session.get( 'leakageData.serviceFilter'   );
        
        var startDate       = Session.get( 'leakageFilterDates.selectedStartDate' );
        var   endDate       = Session.get( 'leakageFilterDates.selectedEndDate'   );

        var pageLimit       = Session.get( 'leakageData.selectedPageLimit' );
        var pageSkip        = Session.get( 'leakageData.selectedPageSkip'  );

        endDate = moment( endDate ).endOf( 'month' ).toDate();
        
        var      selector = {   patient:   { $in: patientFilter   },
                                physician: { $in: physicianFilter },
                                service:   { $in: serviceFilter   },
                                
                                $and: [ { date:      { $gte: startDate } },
                                        { date:      { $lte: endDate   } } ]
                            };
        
        var   leakageData = LeakageData.find( selector, { sort: { date: 1 }, limit: pageLimit, skip: pageSkip } ); 
        
        return leakageData;
    },

    leakageDataCount: function ()
    {
        var patientFilter   = Session.get( 'leakageData.patientFilter'   );
        var physicianFilter = Session.get( 'leakageData.physicianFilter' );
        var serviceFilter   = Session.get( 'leakageData.serviceFilter'   );
        
        var startDate       = Session.get( 'leakageFilterDates.selectedStartDate' );
        var   endDate       = Session.get( 'leakageFilterDates.selectedEndDate'   );

        var pageLimit       = Session.get( 'leakageData.selectedPageLimit' );
        var pageSkip        = Session.get( 'leakageData.selectedPageSkip'  );

        endDate = moment( endDate ).endOf( 'month' ).toDate();
        
        var      selector = {   patient:   { $in: patientFilter   },
                                physician: { $in: physicianFilter },
                                service:   { $in: serviceFilter   },
                                
                                $and: [ { date:      { $gte: startDate } },
                                        { date:      { $lte: endDate   } } ]
                            };
        
        var   leakageData = LeakageData.find( selector, { sort: { date: 1 }, limit: pageLimit, skip: pageSkip } ); 
        
        return leakageData.count();
    },

});

Template.leakageDataPageLimit.helpers({ 

    limits: [ { value:   3 },
              { value:   5 },
              { value:  10 },
              { value:  25 },
              { value:  50 },
              { value: 100 }, ],

    selected: function ()
    {
        var pageLimit = Session.get( 'leakageData.selectedPageLimit' );

        return this.value == pageLimit ? "selected" : "";
    }
});

Template.leakageDataPageLimit.events({ 

    'change #leakageDataPageLimit': function ( event )
    {
        var pageLimit  = parseInt( event.srcElement.value );

        Session.set( "leakageData.selectedPageLimit", pageLimit );
    },

});


Template.leakageDataNavPrev.events({ 

    'click button': function ( event )
    {
        var pageLimit       = Session.get( 'leakageData.selectedPageLimit' );
        var pageSkip        = Session.get( 'leakageData.selectedPageSkip'  );

        pageSkip -= pageLimit;

        pageSkip = Math.max( 0, pageSkip );

        Session.set( "leakageData.selectedPageSkip", pageSkip );
    },

});

Template.leakageDataNavNext.events({ 

    'click button': function ( event )
    {
        var pageLimit       = Session.get( 'leakageData.selectedPageLimit' );
        var pageSkip        = Session.get( 'leakageData.selectedPageSkip'  );

        pageSkip += pageLimit;

        Session.set( "leakageData.selectedPageSkip", pageSkip );
    },

});


Template.leakageDataRow.helpers( 
    { 
        leakageDataCount: function ()
        {
            var patientFilter   = Session.get( 'leakageData.patientFilter'   );
            var physicianFilter = Session.get( 'leakageData.physicianFilter' );
            var serviceFilter   = Session.get( 'leakageData.serviceFilter'   );
            
            var startDate       = Session.get( 'leakageFilterDates.selectedStartDate' );
            var   endDate       = Session.get( 'leakageFilterDates.selectedEndDate'   );

            endDate = moment( endDate ).endOf( 'month' ).toDate();
            
            var      selector = {   patient:   { $in: patientFilter   },
                                    physician: { $in: physicianFilter },
                                    service:   { $in: serviceFilter   },
                                    
                                    $and: [ { date:      { $gte: startDate } },
                                            { date:      { $lte: endDate   } } ]
                                };
            
            var   leakageData = LeakageData.find( selector, { sort: { date: 1 } } ); 
            
            return leakageData.count();
        },

        fmtDate: function ()
        {
            return moment( this.date ).format( "DD-MMM-YYYY" );
        },

        fmtAmount: function ()
        {
            return this.amount.toLocaleString( "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 } );
        },

        fmtNetwork:   function () { return { I: "In",       O: "Out"         }[ this.network   ]; },
        fmtPatient:   function () { return { M: "Managed",  U: "Unmanaged"   }[ this.patient   ]; },
        fmtPhysician: function () { return { E: "Employed", A: "Affiliated"  }[ this.physician ]; },
        fmtService:   function () { return { O: "Offered",  N: "Not offered" }[ this.service   ]; }
    });


