const { test, expect } =require( '@playwright/test');
const PersonAPIHelper = require('../PageObjects/PersonAPIHelper');
const { retryAsync } = require('../Utils/apiUtils');

test('Verify first person is Luke Skywalker with retry', async ({ request }) => {
  const personAPIHelper = new PersonAPIHelper(request);

  // Use retryAsync for resilient API call
  const luke = await retryAsync(async () => {
    return await personAPIHelper.getPersonById(1);
  }, 3, 500); // Retry up to 3 times with 500ms delay

  console.log('Person name:', luke.name);

  // Assertions
  expect(luke.name).toBe('Luke Skywalker');
  expect(luke.height).toBe('172');
  expect(luke.mass).toBe('77');
  expect(luke.gender).toBe('male');
  expect(luke.hasVehicles()).toBe(true);
  expect(luke.hasStarships()).toBe(true);
});


test('Negative test: non-existent person with retry', async ({ request }) => {
  const api = new PersonAPIHelper(request);

  // Use retryAsync for resilient API call
  const response = await retryAsync(async () => {
    return await api.getPersonById(9999); // Non-existent person
  }, 3, 500); // Retry up to 3 times with 500ms delay

  // Assertions
  expect(response.error).toBe(true);
  expect(response.status).toBe(404);

  console.log('Error response structure:', response);
});