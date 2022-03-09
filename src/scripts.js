//----------- Imports ------------------
import fetchAPI from './apiCalls';
import domUpdates from './DomUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';
import TravelRepo from './TravelRepo';
import './css/base.css';

//----------- Query Selectors --------------
const dateInput = document.querySelector('.date-input');
const durationInput = document.querySelector('.duration-drop-menu');
const travelersInput = document.querySelector('.travelers-drop-menu');
const destinationsInput = document.querySelector('.dest-drop-menu');
const submitBtn = document.querySelector('.submit-button');
const estimateBtn = document.querySelector('.estimate-cost');
const inputFields = document.querySelectorAll('.input');

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
      globalCurrentTravelRepo.determineCurrentTraveler(15);
      // globalCurrentTravelRepo.determineCurrentTraveler(
      //   getRandomID(globalCurrentTravelRepo.travelers).id
      // );
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
  travelRepo.todaysDate();
  travelRepo.buildTravelerDataArrays();
  travelRepo.assignTravelerUsernames();
  travelRepo.assignTravelerPasswords();
  travelRepo.getTotalCostPerTrip();
  travelRepo.returnFirstNames();
  travelRepo.getTotalTravelerCost();
  travelRepo.getTravelerCostByYear();
};

const updateDom = () => {
  fillMenus();
  domUpdates.displayWelcomeMessage(
    globalCurrentTravelRepo.currentTraveler.firstName
  );
  domUpdates.displayCurrentTravelerTotalCost(
    globalCurrentTravelRepo.currentTraveler.totalSpent
  );
  domUpdates.displayTotalsForYears(globalCurrentTravelRepo.currentTraveler);
  domUpdates.populateTravelerTripCards(
    globalCurrentTravelRepo.currentTraveler.trips,
    globalCurrentTravelRepo.destinations
  );
};

const fillMenus = () => {
  domUpdates.fillDurationMenu();
  domUpdates.fillTravelersMenu();
  domUpdates.fillDestinationMenu(globalCurrentTravelRepo.destinations);
};

const updatePageAfterTripSubmission = () => {
  fetchAPI.getTrips().then((values) => {
    console.log(values);
    const trips = values.trips.map(
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
    globalCurrentTravelRepo.trips = trips;
    buildOutData(globalCurrentTravelRepo);
    updateDom();
  });
};

//--------------- Scripts -----------------
window.onload = (event) => (event, renderPage());

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formattedDate = `${dateInput.value}`.replaceAll('-', '/');
  const newTrip = {
    id: +globalCurrentTravelRepo.trips.length + 1,
    userID: +globalCurrentTravelRepo.currentTraveler.id,
    destinationID: +destinationsInput.value,
    travelers: +travelersInput.value,
    date: formattedDate,
    duration: +durationInput.value,
    status: 'pending',
    suggestedActivities: [],
  };
  console.log(newTrip);
  fetchAPI.postNewTrip(newTrip);
  updatePageAfterTripSubmission();
});

inputFields.forEach((input) =>
  input.addEventListener('change', (e) => {
    if (
      dateInput.value &&
      durationInput.value &&
      travelersInput.value &&
      destinationsInput.value
    ) {
      domUpdates.estimateCost(globalCurrentTravelRepo.destinations);
    }
  })
);
