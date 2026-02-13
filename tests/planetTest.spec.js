
const { test, expect } =require( '@playwright/test');
const PlanetAPIHelper = require('../PageObjects/PlanetAPIHelper');




test('Verify that the total planets count is 60 with retry', async ({ request }) => {
  const planetAPIHelper = new PlanetAPIHelper(request);

  
  const planetResponse =  await planetAPIHelper.getPlanets();


  console.log('Total planets count:', planetResponse.count);

  // Assertion
  expect(planetResponse.count).toEqual(60);
});



test('Advanced search: Dorin planet validation ', async ({ request }) => {
 const planetsApi = new PlanetAPIHelper(request);

  let dorinPlanet = null;
  let page = 1;

  // Loop through all pages to find "Dorin"
  while (!dorinPlanet) {
    const planetsResponse = await planetsApi.getPlanets(page);

    // Try to locate the planet by name
    dorinPlanet = planetsResponse.getPlanetByName('Dorin');

    // If not found, check if there is a next page
    if (!dorinPlanet && planetsResponse.next) {
      page++;
    } else {
      break;
    }
  }

  // Ensure we found Dorin
  expect(dorinPlanet).toBeDefined();

  // Ensure Dorin is exactly the planet we are looking for
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