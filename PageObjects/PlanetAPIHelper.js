const PlanetResponse = require('./PlanetResponse'); 
const dataset = JSON.parse(JSON.stringify(require('../Utils/TestData.json')));

class PlanetAPIHelper {
  constructor(request) {
    this.request = request; 
    this.baseUrl = dataset.baseUrl;
  }

  async getPlanets(page = 1) {
    const response = await this.request.get(`${this.baseUrl}/planets/?page=${page}`);
    if (!response.ok()) {
      throw new Error(`Failed to fetch planets: ${response.status()}`);
    }
    const data = await response.json();
    return new PlanetResponse(data);
  }

  async getPlanetById(id) {
    const response = await this.request.get(`${this.baseUrl}/planets/${id}/`);
    if (!response.ok()) {
      throw new Error(`Failed to fetch planet with id ${id}: ${response.status()}`);
    }
    const data = await response.json();
    return new PlanetResponse({ count: 1, next: null, previous: null, results: [data] });
  }
}

module.exports = PlanetAPIHelper;
