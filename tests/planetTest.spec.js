
const { test, expect } =require( '@playwright/test');
const PlanetAPIHelper = require('../PageObjects/PlanetAPIHelper');
const { retryAsync } = require('../Utils/apiUtils');



test('Verify that the total planets count is 60 with retry', async ({ request }) => {
  const planetAPIHelper = new PlanetAPIHelper(request);

  // Use retryAsync for resilient API call
  const planetResponse = await retryAsync(async () => {
    return await planetAPIHelper.getPlanets();
  }, 3, 500); // Retry 3 times with 500ms delay

  console.log('Total planets count:', planetResponse.count);

  // Assertion
  expect(planetResponse.count).toEqual(60);
});



test('Advanced search: Dorin planet validation with retry', async ({ request }) => {
  const planetsApi = new PlanetAPIHelper(request);

  // Retry wrapper for finding Dorin planet
  const dorinPlanet = await retryAsync(async () => {
    let planet = null;
    let page = 1;

    while (!planet) {
      const planetsResponse = await planetsApi.getPlanets(page);

      // Try to locate the planet by name
      planet = planetsResponse.getPlanetByName('Dorin');

      // If not found, check next page
      if (!planet && planetsResponse.next) {
        page++;
      } else {
        break;
      }
    }

    if (!planet) throw new Error('Dorin planet not found');
    return planet;
  }, 3, 500); // retry up to 3 times with 500ms delay

  // Ensure we found Dorin
  expect(dorinPlanet).toBeDefined();

  // Ensure dorin is exactly the planet we are looking for
  expect(dorinPlanet.name).toBe('Dorin');

  // Verify diameter
  expect(dorinPlanet.diameter).toBe('13400');

  // Verify exactly one resident
  expect(dorinPlanet.residents.length).toBe(1);

  console.log('Dorin planet details:', {
    name: dorinPlanet.name,
    diameter: dorinPlanet.diameter,
    residents: dorinPlanet.residents
  });
});