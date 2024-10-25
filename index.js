const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('Error fetching Ip address: ', error);
    return;
  }

  console.log('It worked! Returned IP: ', ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (!data) {
      console.log(error);
      return;
    }
    console.log(`Latitude: ${data.latitude}`, `Longitude: ${data.longitude}`);
  });
});