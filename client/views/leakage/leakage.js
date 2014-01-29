// client/views/leakage/leakage.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-28 16:44:35 golden@golden-garage.net>
//

var currency = function ( amt )
{
    return amt.toLocaleString( "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 } );
}

Template.leakage.helpers( 
    { 
        minDate: function () 
        { 
            return "January 2013"; 
        },

        maxDate: function () 
        { 
            return "December 2013"; 
        },

        leakageSummaryRecordsCount: function ()
        {
            return Session.get( "leakage.totalCount" );
;
        },

        leakageSummaryTotalIn: function ()
        {
            return currency( Session.get( "leakage.totalIn" ) );
        },

        leakageSummaryTotalOut: function ()
        {
            return currency( Session.get( "leakage.totalOut" ) );
        },

        leakageSummaryTotalCount: function ()
        {
            return Session.get( "leakage.totalCount" );
        },

        leakageSummaryByMonth: function () 
        { 
            var patientFilter   = Session.get( 'leakageData.patientFilter'   );
            var physicianFilter = Session.get( 'leakageData.physicianFilter' );
            var serviceFilter   = Session.get( 'leakageData.serviceFilter'   );

            var firstDate       = Session.get( "leakageFilterDates.selectedStartDate" );
            var lastDate        = Session.get( "leakageFilterDates.selectedEndDate"   );

            var firstMonth      = Session.get( "leakageFilterDates.selectedStartMonth" );
            var lastMonth       = Session.get( "leakageFilterDates.selectedEndMonth"   );

            var leakageSummary = [];

            var grandTotalIn = 0, grandTotalOut = 0, grandTotalCount = 0;

            var sm = moment( firstDate ).startOf( 'month' );
            var em = moment( lastDate  ).endOf(   'month' );

            for ( var month = moment( sm ); month < em; month.add( 1, "month" ) )
            {
                var countIn = 0, countOut = 0;
                var totalIn = 0, totalOut = 0;

                var selector = {     month:      month.format( "YYYY-MM" ),
                                     patient:    { $in: patientFilter    },
                                     physician:  { $in: physicianFilter  },
                                     service:    { $in: serviceFilter    },
                               };


                selector.network = "I";

                countIn = LeakageData.find( selector ).count();

                LeakageData.find( selector ).forEach(
                    function ( data )
                    {
                        totalIn += data.amount;
                    }
                );


                selector.network = "O";

                countOut = LeakageData.find( selector ).count();

                LeakageData.find( selector ).forEach(
                    function ( data )
                    {
                        totalOut += data.amount;
                    }
                );


                grandTotalIn  += totalIn;
                grandTotalOut += totalOut;

                grandTotalCount += countIn + countOut;

                leakageSummary.push( {        month: month.format( "YYYY-MM" ),
                                              count: countIn + countOut,
                                          inNetwork: currency( totalIn  ),
                                       outOfNetwork: currency( totalOut )
                                     }
                                   );
            }

            Session.set( "leakage.totalIn",    grandTotalIn    );
            Session.set( "leakage.totalOut",   grandTotalOut   );
            Session.set( "leakage.totalCount", grandTotalCount );

            return leakageSummary;
        }

    });

