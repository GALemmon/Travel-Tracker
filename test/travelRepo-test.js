import chai from 'chai';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';
import Destination from '../src/Destination';
import TravelRepo from '../src/TravelRepo';
const expect = chai.expect;

const rawDestinations = [
  {
    alt: 'overview of city buildings with a clear sky',
    destination: 'Lima, Peru',
    estimatedFlightCostPerPerson: 400,
    estimatedLodgingCostPerDay: 70,
    id: 1,
    image: 'https://images.unsplash.com/photo-1489171084589-9b5031',
  },
  {
    alt: 'city with boats on the water during the day time',
    destination: 'Stockholm, Sweden',
    estimatedFlightCostPerPerson: 780,
    estimatedLodgingCostPerDay: 100,
    id: 2,
    image: 'https://images.unsplash.com/photo-1560089168-6516081f5',
  },
  {
    alt: 'opera house and city buildings on the water with boats',
    destination: 'Sydney, Austrailia',
    estimatedFlightCostPerPerson: 950,
    estimatedLodgingCostPerDay: 130,
    id: 3,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16',
  },
];

const rawTravelers = [
  {
    id: 1,
    name: 'Ham Leadbeater',
    travelerType: 'relaxer',
  },
  {
    id: 2,
    name: 'Rachael Vaughten',
    travelerType: 'thrill-seeker',
  },
  {
    id: 3,
    name: 'Sibby Dawidowitsch',
    travelerType: 'shopper',
  },
];

const rawTrips = [
  {
    date: '2022/09/16',
    destinationID: 1,
    duration: 8,
    id: 1,
    status: 'approved',
    suggestedActivities: [],
    travelers: 1,
    userID: 1,
  },
  {
    date: '2022/10/04',
    destinationID: 2,
    duration: 18,
    id: 2,
    status: 'approved',
    suggestedActivities: [],
    travelers: 5,
    userID: 2,
  },
  {
    date: '2022/05/22',
    destinationID: 3,
    duration: 17,
    id: 3,
    status: 'approved',
    suggestedActivities: [],
    travelers: 4,
    userID: 3,
  },
  {
    date: '2022/02/25',
    destinationID: 2,
    duration: 10,
    id: 4,
    status: 'approved',
    suggestedActivities: [],
    travelers: 2,
    userID: 1,
  },
  {
    date: '2022/04/30',
    destinationID: 3,
    duration: 18,
    id: 5,
    status: 'approved',
    suggestedActivities: [],
    travelers: 3,
    userID: 2,
  },
  {
    date: '2022/06/29',
    destinationID: 1,
    duration: 9,
    id: 6,
    status: 'approved',
    suggestedActivities: [],
    travelers: 3,
    userID: 3,
  },
];

describe('TravelRepo', () => {
  const travelers = rawTravelers.map(
    (data) => new Traveler(data.id, data.name, data.travelerType)
  );
  const trips = rawTrips.map(
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
  const destinations = rawDestinations.map(
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
  const travelRepo = new TravelRepo(travelers, trips, destinations);

  it('should be a function', function () {
    expect(TravelRepo).to.be.a('function');
  });

  it('should be an instance of TravelRepo', function () {
    expect(travelRepo).to.be.an.instanceOf(TravelRepo);
  });

  it('should have travelers', function () {
    expect(travelRepo.travelers).to.eql(travelers);
  });

  it('should have trips', () => {
    expect(travelRepo.trips).to.eql(trips);
  });

  it('should have destinations', () => {
    expect(travelRepo.destinations).to.equal(destinations);
  });

  it('should have build out trip arrays for each traveler', () => {
    travelRepo.buildTravelerDataArrays();
    expect(travelRepo.travelers[1].trips[0]).to.equal(trips[1]);
    expect(travelRepo.travelers[0].trips[1]).to.equal(trips[3]);
  });

  it('should find travelers first names', () => {
    travelRepo.returnFirstNames();
    expect(travelRepo.travelers[2].firstName).to.equal('Sibby');
  });

  it('should find and object in an array', () => {
    let entry = travelRepo.findArrayEntry(2, travelers);
    expect(entry).to.equal(travelers[1]);
  });

  it('should calculate the filght cost for each trip', () => {
    travelRepo.findTripFlightCost();
    expect(travelRepo.travelers[0].trips[0].flightCost).to.equal(400);
  });

  it('should calculate the lodging cost for each trip', () => {
    travelRepo.findTripLodgingCost();
    expect(travelRepo.travelers[0].trips[0].lodgingCost).to.equal(560);
  });

  it('should calculate the total cost for each trip, including a 10% fee', () => {
    travelRepo.getTotalCostPerTrip();
    expect(travelRepo.travelers[0].trips[0].totalCost).to.equal(1056);
  });

  it('should calculate the total travel cost for each traveler', () => {
    travelRepo.getTotalTravelerCost();
    expect(travelRepo.travelers[0].totalSpent).to.equal(3872);
  });
});
