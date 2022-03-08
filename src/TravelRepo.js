class TravelRepo {
  constructor(travelers, trips, destinations) {
    this.travelers = travelers;
    this.trips = trips;
    this.destinations = destinations;
  }

  buildTravelerDataArrays() {
    const updatedTravelerData = [...this.travelers];
    updatedTravelerData.map((traveler) => {
      traveler.trips = this.trips.filter((trip) => trip.userID === traveler.id);
    });
    this.travelers = updatedTravelerData;
    return updatedTravelerData;
  }

  returnFirstNames() {
    const updatedTravelerData = [...this.travelers];
    updatedTravelerData.map(
      (traveler) => (traveler.firstName = traveler.fullName.split(' ')[0])
    );
    this.travelers = updatedTravelerData;
    return updatedTravelerData;
  }

  determineCurrentTraveler(id) {
    return (this.currentTraveler = this.travelers.find(
      (user) => id === user.id
    ));
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let newToday = `${yyyy}/${mm}/${dd}`;
    this.currentDate = newToday;
  }

  findArrayEntry(id, array) {
    const entry = array.find((entry) => entry.id === id);
    return entry;
  }

  findTripFlightCost() {
    const tripsData = [...this.trips];
    const destData = [...this.destinations];
    tripsData.map((trip) => {
      trip.flightCost =
        this.findArrayEntry(trip.destinationID, destData).estCostFlight *
        trip.travelers;
    });
    this.trips = tripsData;
    return tripsData;
  }

  findTripLodgingCost() {
    const tripsData = [...this.trips];
    const destData = [...this.destinations];
    tripsData.map((trip) => {
      trip.lodgingCost =
        this.findArrayEntry(trip.destinationID, destData).estCostLodging *
        trip.duration;
    });
    this.trips = tripsData;
    return tripsData;
  }

  getTotalCostPerTrip() {
    this.findTripFlightCost();
    this.findTripLodgingCost();
    const tripsData = [...this.trips];
    tripsData.map(
      (trip) =>
        (trip.totalCost =
          trip.lodgingCost +
          trip.flightCost +
          (trip.lodgingCost + trip.flightCost) / 10)
    );
    this.trips = tripsData;
    return tripsData;
  }

  getTotalTravelerCost() {
    const travelerData = [...this.travelers];
    travelerData.map((traveler) => {
      traveler.totalSpent = traveler.trips.reduce((total, trip) => {
        return (total += trip.totalCost);
      }, 0);
    });
    this.travelers = travelerData;
    return travelerData;
  }

  getTravelerCostByYear() {
    const travelerData = [...this.travelers];
    travelerData.map((traveler) => {
      traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) == 2019) {
          return (total += trip.totalCost);
        }
        return traveler.spentIn2019 = total;
      }, 0);
      traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) == 2020) {
          return (total += trip.totalCost);
        }
        return (traveler.spentIn2020 = total);
      }, 0);
      traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) == 2021) {
          return (total += trip.totalCost);
        }
        return (traveler.spentIn2021 = total);
      }, 0);
      traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) == 2022) {
          return (total += trip.totalCost);
        }
        return (traveler.spentIn2022 = total);
      }, 0);
      this.travelers = travelerData;
    });
  }

  getTraveler2020Cost() {
    const travelerData = [...this.travelers];
    travelerData.map((traveler) => {
      traveler.spentIn2020 = traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) == 2020) {
          return (total += trip.totalCost);
        }
        return total;
      }, 0);
      this.travelers = travelerData;
    });
  }

  getTravelerCurrentYearCost(todaysDate) {
    const travelerData = [...this.travelers];
    travelerData.map((traveler) => {
      traveler.yearSpent = traveler.trips.reduce((total, trip) => {
        if (trip.date.slice(0, 4) === todaysDate.slice(0, 4)) {
          return (total += trip.totalCost);
        }
        return total;
      }, 0);
      this.travelers = travelerData;
    });
  }
}

export default TravelRepo;
