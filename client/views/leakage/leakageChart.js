// client/views/leakage/leakageChart.js
//
// 
// Template helpers for the leakage chart.
//
// Provides:
//
//
//
// last-modified: <2014-01-29 23:51:27 golden@golden-garage.net>
//


// {{{ d3chart.created           

Template.d3chart.created = function () 
{
    _.defer( 
        function ()
        {
            Deps.autorun(
                function ()
                {
                    if ( Deps.currentComputation.firstRun )
                    {
                        var maxWidth  = 600;
                        var maxHeight = 400;

                        // {{{ setup d3convas

                        // define the height, width and margins
                        // --------------------------------------------------------------------------------------------

                        window.leakageChart.margin = 

                            { top: 15, right: 5, bottom: 5, left: 5 };


                        window.leakageChart.width  = 

                            maxWidth  - window.leakageChart.margin.left - window.leakageChart.margin.right;


                        window.leakageChart.height = 

                            maxHeight - window.leakageChart.margin.top  - window.leakageChart.margin.bottom;



                        // define the scale for the x axis - two columns for each month ( inNetwork, outOfNetwork )
                        // --------------------------------------------------------------------------------------------

                        window.leakageChart.x = 

                            d3.scale.ordinal()

                            .rangeRoundBands( [ 0, window.leakageChart.width ], .6 );



                        // define the scale for the x axis - linear from 0 to max value
                        // --------------------------------------------------------------------------------------------

                        window.leakageChart.y = 

                            d3.scale.linear()

                            .rangeRound( [ window.leakageChart.height - 2, 0 ] );

                        
                        // setup the svg node
                        // --------------------------------------------------------------------------------------------

                        window.leakageChart.svg =

                            d3.select( '#d3svg' )
                            .attr( "width", 
                                   window.leakageChart.width         +
                                   window.leakageChart.margin.left   +
                                   window.leakageChart.margin.right  )
                            .attr( "height",
                                   window.leakageChart.height        +
                                   window.leakageChart.margin.top    +
                                   window.leakageChart.margin.bottom )

                            .append( "g" )
                            .attr( "class", "wrapper" )
                            .attr( "transform", 
                                   "translate("+ 
                                   window.leakageChart.margin.left + "," +
                                   window.leakageChart.margin.top  + ")" );

                        // }}}
                    }

                    // {{{ calculate leakageSummary

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
                                                  inNetwork: totalIn,
                                               outOfNetwork: totalOut
                                             }
                                           );
                    }

                    Session.set( "leakage.totalIn",    grandTotalIn    );
                    Session.set( "leakage.totalOut",   grandTotalOut   );
                    Session.set( "leakage.totalCount", grandTotalCount );

                    // }}}


                    window.leakageSummary = leakageSummary;


                    // setup x domain
                    // ------------------------------------------------------------------------------------------------

                    window.leakageChart.x.domain( 

                        window.leakageSummary.map( 

                            function ( m ) 
                            { 
                                return m.month; 
                            } 
                        ) 
                    );



                    // setup y domain
                    // ------------------------------------------------------------------------------------------------

                    window.leakageChart.y.domain( 

                        [ 0, 

                          d3.max( window.leakageSummary, 

                                  function ( m ) 
                                  { 
                                      return Math.max( m.inNetwork, m.outOfNetwork ); 
                                  } 
                                ) 
                        ] 
                    );


                    // {{{ draw bars              

                    var in_bar_selector = 

                        window.leakageChart.svg.selectAll( ".inNetworkBar" )

                        .data( window.leakageSummary, 

                               function ( m ) 
                               { 
                                   return m.month; 
                               } 
                             );


                    in_bar_selector.enter()

                        .append( "rect" )

                        .attr( "class",  function ( m )
                                         {
                                             return "inNetworkBar";
                                         } 
                             );
                    

                    in_bar_selector.exit().remove();


                    in_bar_selector.transition()

                        .duration( 100 )

                        .attr( "x", function ( m ) { return window.leakageChart.x( m.month     ); } )
                        .attr( "y", function ( m ) { return window.leakageChart.y( m.inNetwork ); } )

                        .attr( "width",  window.leakageChart.x.rangeBand() )

                        .attr( "height", function ( m ) 
                                         { 
                                             return window.leakageChart.height - 
                                                    window.leakageChart.y( m.inNetwork ) - 20; 
                                         } 
                             );

                    var out_bar_selector = 

                        window.leakageChart.svg.selectAll( ".outOfNetworkBar" )

                        .data( window.leakageSummary, 

                               function ( m ) 
                               { 
                                   return m.month; 
                               } 
                             );


                    out_bar_selector.enter()

                        .append( "rect" )

                        .attr( "class",  function ( m )
                                         {
                                             return "outOfNetworkBar";
                                         } 
                             );
                    

                    out_bar_selector.exit().remove();


                    out_bar_selector.transition()

                        .duration( 100 )

                        .attr( "x",      function ( m ) 
                                         { 
                                             return window.leakageChart.x( m.month ) +
                                                    window.leakageChart.x.rangeBand() + 3; 
                                         } 
                             )

                        .attr( "y",      function ( m ) 
                                         { 
                                             return window.leakageChart.y( m.outOfNetwork ); 
                                         } 
                             )

                        .attr( "width",  window.leakageChart.x.rangeBand() 
                             )

                        .attr( "height", function ( m ) 
                                         { 
                                             return window.leakageChart.height - 
                                                    window.leakageChart.y( m.outOfNetwork ) - 20;
                                         } 
                             );

                    // }}}
                    // {{{ draw count in bars  

                    var in_count_selector = 

                        window.leakageChart.svg.selectAll( ".inNetworkCount" )

                        .data( window.leakageSummary, 

                               function( m ) 
                               { 
                                   return m.month;
                               } 
                             );
                    
                    
                    in_count_selector.enter()

                        .append( "text" )
                        .attr( "class", "inNetworkCount" );
                    

                    in_count_selector.exit().remove();

                    in_count_selector.transition()

                        .duration( 100 )

                        .attr( "x",      function ( m ) 
                                         { 
                                             return window.leakageChart.x( m.month ) + 2; 
                                         } 
                             )
                        .attr( "y",      function ( m ) 
                                         { 
                                             return window.leakageChart.height - 25;
                                         } 
                             )
                        .attr( "height", function ( m ) 
                                         { 
                                             return window.leakageChart.height - 
                                                    window.leakageChart.y( m.inNetwork ) - 20;
                                         } 
                             )
                        .text( function ( m ) 
                               { 
                                   return m.count 
                               } 
                             );

                    var out_count_selector = 

                        window.leakageChart.svg.selectAll( ".outOfNetworkCount" )

                        .data( window.leakageSummary, 

                               function( m ) 
                               { 
                                   return m.month;
                               } 
                             );
                    
                    
                    out_count_selector.enter()

                        .append( "text" )
                        .attr( "class", "outOfNetworkCount" );
                    

                    out_count_selector.exit().remove();

                    out_count_selector.transition()

                        .duration( 100 )

                        .attr( "x",      function ( m ) 
                                         { 
                                             return window.leakageChart.x( m.month ) + 
                                                    window.leakageChart.x.rangeBand() + 5; 
                                         } 
                             )
                        .attr( "y",      function ( m ) 
                                         { 
                                             return window.leakageChart.height - 25; 
                                         } 
                             )
                        .attr( "height", function ( m ) 
                                         { 
                                             return window.leakageChart.height - 
                                                    window.leakageChart.y( m.outOfNetwork ) - 20; 
                                         } 
                             )

                        .text( function ( m ) { return m.count } );


                    var month_selector = 

                        window.leakageChart.svg.selectAll( ".monthLabel" )

                        .data( window.leakageSummary, 

                               function( m ) 
                               { 
                                   return m.month;
                               } 
                             );
                    
                    
                    month_selector.enter()

                        .append( "text" )
                        .attr( "class", "monthLabel" );
                    

                    month_selector.exit().remove();

                    month_selector.transition()

                        .duration( 100 )

                        .attr( "x",      function ( m ) 
                                         { 
                                             return window.leakageChart.x( m.month ) + 3; 
                                         } 
                             )
                        .attr( "y",      function ( m ) 
                                         { 
                                             return window.leakageChart.height - 5; 
                                         } 
                             )
                        .attr( "height", function ( m ) 
                                         { 
                                             return window.leakageChart.height - 
                                                    window.leakageChart.y( m.outOfNetwork ); 
                                         } 
                             )

                        .text( function ( m ) { return moment( m.month + "-01" ).format( "MMM YY" ); } );

                    // }}}

                });
        });
}

// }}}
