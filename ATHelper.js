const regrest = require("./regrest");
const ATApi = {
  searchStop: "https://api.at.govt.nz/v2/gtfs/stops/search/",
  stopById: "https://api.at.govt.nz/v2/gtfs/stops/stopinfo/"
};

const ATHead = {
  "Ocp-Apim-Subscription-Key": "44a1b6e08919425ea25f25e358ce3e45"
};

const searchStopsWithQuery = query =>
  regrest
    .get(`${ATApi.searchStop}${query}`, ATHead)
    .then(res => JSON.parse(res))
    .then(data =>
      data.response.slice(0, 11).map(e => ({
        stopName: e.stop_name,
        stopCode: e.stop_code,
        lat: e.stop_lat,
        lon: e.stop_lon
      }))
    )

const getStopInfoById = id =>
  regrest
    .get(`${ATApi.stopById}${id}`, ATHead)
    .then(res => JSON.parse(res))
    .then(data =>
      data.response.map(e => ({
        busNumber: e.route_short_name,
        busFinalDest: e.trip_headsign,
        departTime: e.departure_time
      }))
    )

module.exports = { getStopInfoById: getStopInfoById, searchStopsWithQuery };
