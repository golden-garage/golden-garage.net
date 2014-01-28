// client/views/leakage/leakage.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-27 15:38:30 golden@golden-garage.net>
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
            return 3002;
        },

        leakageSummaryTotalIn: function ()
        {
            return currency( 190000 );
        },

        leakageSummaryTotalOut: function ()
        {
            return currency( 500000 );
        },

        leakageSummaryByMonth: function () 
        { 
            return [
                {         date: '2014-01', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-02', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-03', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-04', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-05', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-06', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-07', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-08', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-09', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-10', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-11', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                },
                {         date: '2014-12', 
                     inNetwork: currency(100), 
                  outOfNetwork: currency(100) 
                }
            ];
        }

    });

