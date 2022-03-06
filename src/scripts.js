//----------- Imports ------------------
import fetchAPI from './apiCalls';
import domUpdates from './DomUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import TravelRepo from './TravelRepo';
import './images/turing-logo.png';
import './css/base.css';

//----------- Global Variables -------------
const rawTravelersData = fetchAPI.getTravelers();
const rawTripsData = fetchAPI.getTrips();
const rawDestinationsData = fetchAPI.getDestinations();

let globalCurrentTravelRepo = null;

//--------------- Functions -----------------
const renderPage = () => {
  Promise.all([rawTravelersData, rawTripsData, rawDestinationsData]).then(
    (values) => {
      const travelers = values[0].travelers.map(
        (data) => new Traveler(data.id, data.name, data.travelerType)
      );
      const trips = values[1].trips.map(
        (data) =>
          new Trip(
            data.date,
            data.destinationID,
            data.duration,
            data.id,
            data.status,
            data.suggestedActivities,
            data.travelers,
            data.userID
          )
      );
      const destinations = values[2].destinations.map(
        (data) =>
          new Destination(
            data.destination,
            data.id,
            data.estimatedFlightCostPerPerson,
            data.estimatedLodgingCostPerDay,
            data.image,
            data.alt
          )
      );
      generateNewTravelRepo(travelers, trips, destinations);
      buildOutData(globalCurrentTravelRepo);
      globalCurrentTravelRepo.determineCurrentUser(
        getRandomID(globalCurrentTravelRepo.travelers).id
      );
      updateDom();

      console.log(globalCurrentTravelRepo);
    }
  );
};

const generateNewTravelRepo = (travelers, trips, destinations) => {
  let travelRepo = new TravelRepo(travelers, trips, destinations);
  return (globalCurrentTravelRepo = travelRepo);
};

const getRandomID = (array) => {
  const randomIndex = array[Math.floor(Math.random() * array.length)];
  return randomIndex;
};

const buildOutData = (travelRepo) => {
  travelRepo.buildTravelerDataArrays();
  travelRepo.getTotalCostPerTrip();
  travelRepo.returnFirstNames();
  travelRepo.getTotalTravelerCost();
};

const updateDom = () => {
  domUpdates.displayWelcomeMessage(
    globalCurrentTravelRepo.currentTraveler.firstName
  );
  domUpdates.displayCurrentTravelerTotalCost(
    globalCurrentTravelRepo.currentTraveler.totalSpent
  );
};

//--------------- Scripts -----------------
window.onload = (event) => (event, renderPage());


