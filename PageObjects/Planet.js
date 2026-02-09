class Planet {
  constructor({
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
    created,
    edited,
    url,
  }) {
    this.name = name;
    this.rotationPeriod = rotation_period;
    this.orbitalPeriod = orbital_period;
    this.diameter = diameter;
    this.climate = climate;
    this.gravity = gravity;
    this.terrain = terrain;
    this.surfaceWater = surface_water;
    this.population = population;
    this.residents = residents || [];
    this.films = films || [];
    this.created = created;
    this.edited = edited;
    this.url = url;
  }

  hasResidents() {
    return this.residents.length > 0;
  }

  appearsInFilms() {
    return this.films.length;
  }
}

module.exports = Planet;