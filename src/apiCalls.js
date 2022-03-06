const fetchAPI = {
  getTravelers() {
    return fetch('http://localhost:3001/api/v1/travelers').then((response) =>
      response.json()
    );
  },
  getTrips() {
    return fetch('http://localhost:3001/api/v1/trips').then((response) =>
      response.json()
    );
  },
  getDestinations() {
    return fetch('http://localhost:3001/api/v1/destinations').then((response) =>
      response.json()
    );
  },
};

export default fetchAPI;
