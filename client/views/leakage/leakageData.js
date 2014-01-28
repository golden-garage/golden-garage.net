// client/views/leakage/leakage.js
//
// 
// The template helper for the leakage route.
//
// Provides:
//
//
//
// last-modified: <2014-01-27 14:57:17 golden@golden-garage.net>
//

Template.leakageData.helpers( 
    { 
        leakageData: function () 
        { 
            return LeakageData.find( {}, { sort: { date: 1 } } ); 
        }

    });


Template.leakageDataRow.helpers( 
    { 
        fmtDate: function ()
        {
            return moment( this.date ).format( "YYYY MMM DD" );
        },

        fmtAmount: function ()
        {
            return this.amount.toLocaleString( "en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 } );
        },

        fmtNetwork: function ()
        {
            return this.network   === "I" ? "In"       : ( this.network === "O" ? "Out"         : "UNKOWN! " + this.network   );
        },

        fmtPatient: function ()
        {
            return this.patient   === "M" ? "Managed"  : ( this.network === "U" ? "Unmanaged"   : "UNKOWN! " + this.patient   );
        },

        fmtPhysician: function ()
        {
            return this.physician === "E" ? "Employed" : ( this.network === "A" ? "Affiliated"  : "UNKOWN! " + this.physician );
        },

        fmtService: function ()
        {
            return this.service   === "O" ? "Offered"  : ( this.network === "N" ? "Not offered" : "UNKOWN! " + this.service   );
        }
    });


