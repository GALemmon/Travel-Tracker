const welcomeMessage = document.querySelector('.welcome-message');
const totalCost = document.querySelector('.total-spent');
const yearsTotals = document.querySelector('.years-totals');
const tripsList = document.querySelector('.trips-area');
const durationMenu = document.querySelector('.duration-drop-menu');
const travlersMenu = document.querySelector('.travelers-drop-menu');
const destMenu = document.querySelector('.dest-drop-menu');
const estimatedCost = document.querySelector('.estimated-cost');

const domUpdates = {
  fillDurationMenu() {
    for (let i = 1; i <= 30; i++) {
      durationMenu.innerHTML += `<option value="${i}">${i}</option>`;
    }
  },

  fillTravelersMenu() {
    for (let i = 1; i <= 30; i++) {
      travlersMenu.innerHTML += `<option value="${i}">${i}</option>`;
    }
  },

  fillDestinationMenu(destinations) {
    destinations.forEach((destination) => {
      destMenu.innerHTML += `<option value="${destination.id}">${destination.name}</option>`;
    });
  },

  displayWelcomeMessage(traveler) {
    return (welcomeMessage.innerText = `Hello, ${traveler}!`);
  },

  displayCurrentTravelerTotalCost(totalSpent) {
    return (totalCost.innerText = `You have spent a total of $${totalSpent.toFixed(
      2
    )} on travel.  This total includes a 10% travel agent fee and any pending trips.`);
  },

  displayTotalsForYears(traveler) {
    return (yearsTotals.innerHTML = `This year you have spent: $${traveler.spentIn2022.toFixed(
      2
    )}.<br> 
    In 2021, you spent: $${traveler.spentIn2021.toFixed(
      2
    )}.<br> In 2020, you spent: $${traveler.spentIn2020.toFixed(2)}.<br> 
    In 2019, you spent: $${traveler.spentIn2019.toFixed(2)}.`);
  },

  populateTravelerTripCards(travelerTrips, destinations) {
    travelerTrips.forEach((trip) => {
      let destination = destinations.find(
        (destination) => destination.id === trip.destinationID
      );
      tripsList.innerHTML += `<li class="card">
        <div class="img">
          <img src=${destination.image} alt=${destination.alt}>
        </div>
        <div class="trip-details">
          <h2>${destination.name}</h2>
          <h3>${trip.travelers} people, ${trip.duration} days</h3>
          <h3>Total Cost: $${trip.totalCost.toFixed(2)}</h3>
          <h4>${trip.status}</h4>
        </div>
      </li>`;
    });
  },

  estimateCost(destinations) {
    const destination = destinations.find(
      (destination) => destination.id == destMenu.value
    );
    const destCost =
      destination.estCostFlight * travlersMenu.value +
      destination.estCostLodging * durationMenu.value;
    const totalCost = destCost + destCost / 10;
    return (estimatedCost.innerText = `Estimated Cost: $${totalCost}`);
  },

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },
};

export default domUpdates;
