// client/main.js
//
// Setup the Meteor client (subscribe to server data) and user Session.
//
// Provides:
//
//   notes       - the entire Notes       collection
//   leakageData - the entire LeakageData collection
//
//
// last-modified: <2014-01-29 12:04:25 golden@golden-garage.net>
//

Meteor.subscribe( "notes"               );
Meteor.subscribe( "leakageData"         );
Meteor.subscribe( "filteredLeakageData" );


// initialize session

var minDate = new Date( "2013-01-01 12:00" );
var maxDate = new Date( "2013-12-31 12:00" );

var minMonth = moment( minDate ).format( "YYYY-MM" );
var maxMonth = moment( maxDate ).format( "YYYY-MM" );


Session.set( "leakageSummary.startingMonth",   minMonth );
Session.set( "leakageSummary.endingMonth",     maxMonth );


Session.set( "leakageData.minDate",            minDate );
Session.set( "leakageData.maxDate",            maxDate );

Session.set( "leakageData.minMonth",           minMonth );
Session.set( "leakageData.maxMonth",           maxMonth );

Session.set( "leakageData.networkFilter",      [ "I", "O" ] );
Session.set( "leakageData.patientFilter",      [ "M", "U" ] );
Session.set( "leakageData.physicianFilter",    [ "E", "A" ] );
Session.set( "leakageData.serviceFilter",      [ "O", "N" ] );

Session.set( "leakageData.selectedPageLimit",  10 );
Session.set( "leakageData.selectedPageSkip",    0 );


Session.set( "leakageFilterDates.selectedStartDate",   minDate  );
Session.set( "leakageFilterDates.selectedStartMonth",  minMonth );

Session.set( "leakageFilterDates.selectedEndDate",     maxDate  );
Session.set( "leakageFilterDates.selectedEndMonth",    maxMonth );

Session.set( "leakageChart.months", [ { month: "2013-01", in: 10, out: 10 },
                                      { month: "2013-02", in: 11, out: 10 },
                                      { month: "2013-03", in: 12, out: 10 },
                                      { month: "2013-04", in: 13, out: 10 },
                                      { month: "2013-05", in: 14, out: 10 },
                                      { month: "2013-06", in: 15, out: 10 },
                                      { month: "2013-07", in: 16, out: 10 },
                                      { month: "2013-08", in: 17, out: 10 },
                                      { month: "2013-09", in: 18, out: 10 },
                                      { month: "2013-10", in: 19, out: 10 },
                                      { month: "2013-11", in: 20, out: 10 },
                                      { month: "2013-12", in: 21, out: 10 },
                                    ]
           );
