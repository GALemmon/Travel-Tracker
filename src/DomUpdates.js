const welcomeMessage = document.querySelector('.welcome-message');
const totalCost = document.querySelector('.total-spent');
const yearsTotals = document.querySelector('.years-totals');
const tripsList = document.querySelector('.trips-area');
const durationMenu = document.querySelector('.duration-drop-menu');
const travelersMenu = document.querySelector('.travelers-drop-menu');
const destMenu = document.querySelector('.dest-drop-menu');
const estimatedCost = document.querySelector('.estimated-cost');

const domUpdates = {
  fillDurationMenu() {
    // durationMenu.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
      durationMenu.innerHTML += `<option value="${i}">${i}</option>`;
    }
  },

  fillTravelersMenu() {
    // travelersMenu.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
      travelersMenu.innerHTML += `<option value="${i}">${i}</option>`;
    }
  },

  fillDestinationMenu(destinations) {
    // destMenu.innerHTML = '';
    const sortedDestinations = destinations.sort(function(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;})
    sortedDestinations.forEach((destination) => {
      destMenu.innerHTML += `<option value="${destination.id}">${destination.name}</option>`;
    });
  },

  displayWelcomeMessage(traveler) {
    welcomeMessage.innerText = '';
    return (welcomeMessage.innerText = `Hello, ${traveler}!`);
  },

  displayCurrentTravelerTotalCost(totalSpent) {
    totalCost.innerText = '';
    return (totalCost.innerText = `You have spent a total of $${totalSpent.toFixed(
      2
    )} on travel.  This total includes a 10% travel agent fee and any pending trips.`);
  },

  displayTotalsForYears(traveler) {
    yearsTotals.innerHTML = '';
    const total2022 = traveler.spentIn2022.toFixed(2) ?? 0.00;
    const total2021 = traveler.spentIn2021.toFixed(2) ?? 0.00;
    const total2020 = traveler.spentIn2020.toFixed(2) ?? 0.00;
    const total2019 = traveler.spentIn2019.toFixed(2) ?? 0.00;
    return (yearsTotals.innerHTML = `This year you have spent: $${total2022}.<br> 
    In 2021, you spent: $${total2021}.<br> In 2020, you spent: $${total2020}.<br> 
    In 2019, you spent: $${total2019}.`);
  },

  populateTravelerTripCards(travelerTrips, destinations) {
    tripsList.innerHTML = '';
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
      destination.estCostFlight * travelersMenu.value +
      destination.estCostLodging * durationMenu.value;
    const totalCost = destCost + destCost / 10;
    return (estimatedCost.innerText = `Estimated Cost: $${totalCost.toFixed(2)}`);
  },

  clearEstimatedCost() {
    estimatedCost.innerText = 'Estimated Cost: $0';
  },

  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },
};

export default domUpdates;
