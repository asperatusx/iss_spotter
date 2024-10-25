const needle = require('needle');

const API_KEY = "at_h2e3dQRsfjVT1IgmGixjvGfa3iJ6A";

const fetchMyIP = function(callback) {
  needle.get(`https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, resp, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (!body.success) {
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(msg), null);
      return;
    }

    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (resp.statusCode !== 200) {
      const msg = `Status code ${resp.statusCode}. Server response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyTimes = body.response;
    callback(null, flyTimes);
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};