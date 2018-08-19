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
    );

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
    );

const getDelays = () =>
  regrest
    .get(`https://api.at.govt.nz/v2/public/realtime/tripupdates`, ATHead)
    .then(res => JSON.parse(res))
    .then(res => res.response.entity)
    .then(data =>
      data.map(e => ({
        tripId: e.trip_update.trip.trip_id,
        stopId: e.trip_update.stop_time_update.stop_id,
        routeId: e.trip_update.trip.route_id,
        delay:
          typeof e.trip_update.stop_time_update.departure != "undefined"
            ? e.trip_update.stop_time_update.departure.delay
            : "cancelled"
      }))
    )
    .then(data =>
      data.map(e => ({
        stopId: e.stopId.slice(0, e.stopId.indexOf("-")),
        busCode: e.routeId.slice(0, 3),
        delay:
          typeof e.delay == "number"
            ? e.delay < 0
              ? `${e.delay}s early`
              : `${e.delay}s late`
            : e.delay
      }))
    )
    .catch(e => console.log(e));

module.exports = {
  getStopInfoById: getStopInfoById,
  searchStopsWithQuery,
  getDelays
};
