const { nextISSTimesForMyLocation, printFlyOverTimes } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(resp => printFlyOverTimes(resp))
  .catch(error => {
    console.log('It did not work: ', error.message)
  })