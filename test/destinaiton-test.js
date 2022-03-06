import chai from 'chai';
import Destination from '../src/Destination.js';
const expect = chai.expect;

describe('Destination', () => {
  const destination = new Destination('Denver', 1, 150, 200, 'img', 'alt');

  it('should be a function', function () {
    expect(Destination).to.be.a('function');
  });

  it('should be an instance of Destinaiton', function () {
    expect(destination).to.be.an.instanceOf(Destination);
  });

  it('should have a name', () => {
    expect(destination.name).to.equal('Denver');
  });

  it('should have an id', () => {
    expect(destination.id).to.equal(1);
  });

  it('should have an estimated flight cost per traveler', () => {
    expect(destination.estCostFlight).to.equal(150);
  });

  it('should have an estimated lodging cost per day', () => {
    expect(destination.estCostLodging).to.equal(200);
  });

  it('should have an associated image', () => {
    expect(destination.image).to.equal('img');
  });

  it('should have an alt text for the image', () => {
    expect(destination.alt).to.equal('alt');
  });
});
