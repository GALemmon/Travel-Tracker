const welcomeMessage = document.querySelector('.welcome-message');
const totalCost = document.querySelector('.total-spent');

const domUpdates = {
  displayWelcomeMessage(traveler) {
    return (welcomeMessage.innerText = `Hello, ${traveler}!  Let's take a trip.`);
  },

  displayCurrentTravelerTotalCost(totalSpent) {
    return (totalCost.innerText = `You have spent a total of $${totalSpent.toFixed(
      2
    )} on travel.  This includes a 10% travel agent fee.`);
  },
};

export default domUpdates;
