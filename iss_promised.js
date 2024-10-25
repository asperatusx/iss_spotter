const needle = require('needle');
const API_KEY = "at_h2e3dQRsfjVT1IgmGixjvGfa3iJ6A";


/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return needle('get', `https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`)
    .then(resp => { 
      const body = resp.body;  // retrieve the body value from the response object
      const ip = body.ip;  // retrieve the ip from the body object
      return ip;
    })
}

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then(resp => {
      const body = resp.body;
      const latitude = body.latitude;
      const longitude = body.longitude;
      return {latitude, longitude}
    })
}

const fetchISSFlyOverTimes = function(coords) {
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`)
    .then(resp => {
      const body = resp.body;
      const passtimes = body.response;
      return passtimes;
    })
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then(passtimes => {
      return passtimes;
    })
}

const printFlyOverTimes = function(flyTimes) {
  for (const fly of flyTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(fly.risetime);
    const duration = fly.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


module.exports = { nextISSTimesForMyLocation, printFlyOverTimes };