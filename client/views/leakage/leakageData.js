// client/views/leakage/leakage.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-27 22:06:18 golden@golden-garage.net>
//

Template.leakageData.helpers( 
    { 
        leakageData: function () 
        { 
            var patientFilter   = Session.get( 'leakageData.patientFilter'   );
            var physicianFilter = Session.get( 'leakageData.physicianFilter' );
            var serviceFilter   = Session.get( 'leakageData.serviceFilter'   );

            var      selector = {   patient: { $in: patientFilter   },
                                  physician: { $in: physicianFilter },
                                    service: { $in: serviceFilter   }
                                };

            var   leakageData = LeakageData.find( selector, { sort: { date: 1 } } ); 

            return leakageData;
        }

    });


Template.leakageDataRow.helpers( 
    { 
        leakageDataCount: function ()
        {
            return 0; //leakageData.count();
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


