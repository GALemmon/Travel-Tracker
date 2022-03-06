import chai from 'chai';
import Trip from '../src/Trip'
const expect = chai.expect;

describe('Trip', () => {
  const trip = new Trip('03/06/22', 1, 4, 15, 'confirmed', [], 3, 2);

  it('should be a function', function () {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function () {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should have a trip ID', function () {
    expect(trip.id).to.equal(15)
  })

  it('should have a date', () => {
    expect(trip.date).to.equal('03/06/22');
  });

  it('should have an destinationID', () => {
    expect(trip.destinationID).to.equal(1);
  });

  it('should have a duration', () => {
    expect(trip.duration).to.equal(4);
  });

  it('should have a number of travelers', () => {
    expect(trip.travelers).to.equal(3);
  });

  it('should have suggested activities', () => {
    expect(trip.suggestedActivities).to.eql([]);
  });

  it('should have a status', () => {
    expect(trip.status).to.equal('confirmed');
  });

  it('should have an associated traveler ID', () => {
    expect(trip.userID).to.equal(2);
  });
});