const Planet = require('./Planet');

class PlanetResponse {
  constructor({ count, next, previous, results }) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.planets = (results || []).map(p => new Planet(p));
  }

  getPlanetByName(name) {
    return this.planets.find(
      p => p.name.toLowerCase() === name.toLowerCase()
    );
  }

  getPlanetsWithResidents() {
    return this.planets.filter(p => p.hasResidents());
  }

  getPlanetsByClimate(climateType) {
    return this.planets.filter(p =>
      p.climate.toLowerCase().includes(climateType.toLowerCase())
    );
  }

  getAllPlanetNames() {
    return this.planets.map(p => p.name);
  }
}

module.exports = PlanetResponse;
