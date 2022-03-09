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
  postNewTrip(newTrip) {
    fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrip),
    }).then((response) => {
      if (!response.ok) {
        alert('OOPS! Something went wrong.');
        throw new Error('OOPS!  Somethimg went wrong.');
      } else {
        alert('Your trip request has been submitted!');
        return response.json();
      }
    });
  },
};

export default fetchAPI;
