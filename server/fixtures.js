// server/initialize/initializeNotes.js
//
// Setup the initial Meteor collections (when the collections are empty).
//
// Provides:
//
//   LeakageData - the leakageData collection
//   Notes       - the notes       collection
//
//
// last-modified: <2014-01-28 18:48:19 golden@golden-garage.net>
//

if ( Notes.find().count() === 0 ) 
{
    Notes.insert({
        author: 'Sacha Greif',
         title: 'Introducing Telescope',
           url: 'http://sachagreif.com/introducing-telescope/'
    });
    
    Notes.insert({
        author: 'Tom Coleman',
         title: 'Meteor',
           url: 'http://meteor.com'
    });
    
    Notes.insert({
        author: 'Tom Coleman',
         title: 'The Meteor Book',
           url: 'http://themeteorbook.com'
    });
}

if ( LeakageData.find().count() === 0 ) 
{
    var  initialRecordCount = 1000;
    var  initialRandomSeed  = 0;

    var            date = new Date( "2013-10-01" );  // date of claim

    var         claimId = '0000';                    // claim ID from Aetna
    var          amount = 123.45;                    // paid amount

    var         network = 'I';                       // I or O - 'I'n network  or  'O'ut of network
    var         patient = 'M';                       // M or U - 'M'anaged     or  'U'nmanaged
    var       physician = 'E';                       // E or A - 'E'mployed    or  'A'ffiliated
    var         service = 'O';                       // O or N - 'O'ffered     or  'N'ot offered

    var       startDate = new Date( "2013-01-01" );
    var         endDate = new Date( "2013-12-31" );

    var       startTime = startDate.getTime();
    var         endTime =   endDate.getTime();

    var        duration = endTime - startTime;

    var    networkTable = [ "I", "I", "I", "I", "I", "O",  "O",  "O",  "O", "O" ];    // random selection tables
    var    patientTable = [ "M", "M", "M", "M", "M", "U",  "U",  "U",  "U", "U" ];    
    var  physicianTable = [ "E", "E", "E", "E", "E", "A",  "A",  "A",  "A", "A" ];
    var    serviceTable = [ "O", "O", "O", "O", "O", "N",  "N",  "N",  "N", "N" ];

    var     localRandom = Random.create( initialRandomSeed );

    var    randomAmount = function () 
    { 
        return Math.floor( 10000 * localRandom.fraction() ) / 100 + 
            Math.floor( localRandom.fraction() > .3 ? 10000 * localRandom.fraction() : 0 ); 
    }

    var      randomDate = function () 
    { 
        return new Date( startTime + Math.floor( duration * localRandom.fraction() ) );
    }

    for ( var i = 0; i < initialRecordCount; i++ )
    {
        var  date = randomDate();
        var month = moment( date ).format( "YYYY-MM" );

        LeakageData.insert({
               date: date,
              month: month,
            claimId: localRandom.id(),
             amount: randomAmount(),
            network: localRandom.choice( networkTable   ),
            patient: localRandom.choice( patientTable   ),
          physician: localRandom.choice( physicianTable ),
            service: localRandom.choice( serviceTable   ),
        });
    }
}

// UPGRADE: LeakageData without months
LeakageData.find( { month: { $exists: false } } ).forEach( 
    function ( data )
    {
        LeakageData.update( { _id: data._id }, { $set: { month: moment( data.date ).format( "YYYY-MM" ) } } );
    }
);

/*
if ( Users.find().count() === 0 )
{
    Accounts.createUser({
        username: 'golden',
           email: 'golden@golden-garage.net',
        password: 'setst',
         profile: {
            name: 'Rick Golden'
        }
    });
}
*/
