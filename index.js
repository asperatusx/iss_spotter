const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('Error fetching Ip address: ', error);
    return;
  }

  console.log('It worked! Returned IP: ', ip);

  fetchCoordsByIP(ip, (error, coord) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Latitude: ${coord.latitude}`, `Longitude: ${coord.longitude}`);

    fetchISSFlyOverTimes(coord, (error, flyTimes) => {
      if (error) {
        console.log('Looks like there was an error. ', error);
        return;
      }
      console.log('It worked! Retuned flyover times: ', flyTimes);
    });

  });
});