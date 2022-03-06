const welcomeMessage = document.querySelector('.welcome-message');
const totalCost = document.querySelector('.total-spent');
const tripsList = document.querySelector('.trips-area');

const domUpdates = {
  displayWelcomeMessage(traveler) {
    return (welcomeMessage.innerText = `Hello, ${traveler}!  Let's take a trip.`);
  },

  displayCurrentTravelerTotalCost(totalSpent) {
    return (totalCost.innerText = `You have spent a total of $${totalSpent.toFixed(
      2
    )} on travel.  This includes a 10% travel agent fee.`);
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
        </div>
      </li>`;
    });
  },
};

export default domUpdates;
