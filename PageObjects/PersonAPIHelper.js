const Person = require('./Person');
const { z } = require('zod');
const dataset = JSON.parse(JSON.stringify(require('../Utils/TestData.json')));
// Zod schema for runtime validation
const PersonSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  films: z.array(z.string()),
  species: z.array(z.string()),
  vehicles: z.array(z.string()),
  starships: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string()
});

class PersonAPIHelper {
  constructor(request) {
    this.request = request;
    this.baseUrl = dataset.baseUrl;
  }

  // Get person by ID
  async getPersonById(id) {
    const response = await this.request.get(`${this.baseUrl}/people/${id}/`);

    // Negative testing: check status
    if (!response.ok()) {
      return { error: true, status: response.status(), statusText: response.statusText() };
    }

    const data = await response.json();

    // Runtime schema validation
    PersonSchema.parse(data); // throws if invalid

    return new Person(data);
  }
}

module.exports = PersonAPIHelper;
