import chai from 'chai';
import Traveler from '../src/Traveler';
const expect = chai.expect;

describe('Traveler', () => {
  const traveler = new Traveler(5, 'Conan the Barbarian', 'Pillager');

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function () {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should have an ID', function () {
    expect(traveler.id).to.equal(5)
  })

  it('should have a name', function () {
    expect(traveler.fullName).to.equal('Conan the Barbarian')
  })

  it('should have a travaler type', function () {
    expect(traveler.type).to.equal('Pillager')
  })
});