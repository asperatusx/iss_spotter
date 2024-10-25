const fetchMyIP = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('Error fetching Ip address: ', error);
    return;
  }

  console.log('It worked! Returned IP: ', ip);
});