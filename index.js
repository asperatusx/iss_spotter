const { nextISSTimesForMyLocation } = require('./iss');

const printFlyOverTimes = function(flyTimes) {
  for (const fly of flyTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(fly.risetime);
    const duration = fly.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn"t work!', error);
  }

  //sucess, print out the deets!
  printFlyOverTimes(passTimes);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('Error fetching Ip address: ', error);
//     return;
//   }

//   console.log('It worked! Returned IP: ', ip);

//   fetchCoordsByIP(ip, (error, coord) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log(`Latitude: ${coord.latitude}`, `Longitude: ${coord.longitude}`);

//     fetchISSFlyOverTimes(coord, (error, flyTimes) => {
//       if (error) {
//         console.log('Looks like there was an error. ', error);
//         return;
//       }
//       console.log('It worked! Retuned flyover times: ', flyTimes);
//     });

//   });
// });