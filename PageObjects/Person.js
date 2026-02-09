class Person {
  constructor({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
    species,
    vehicles,
    starships,
    created,
    edited,
    url
  }) {
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.hairColor = hair_color;
    this.skinColor = skin_color;
    this.eyeColor = eye_color;
    this.birthYear = birth_year;
    this.gender = gender;
    this.homeworld = homeworld;
    this.films = films || [];
    this.species = species || [];
    this.vehicles = vehicles || [];
    this.starships = starships || [];
    this.created = created;
    this.edited = edited;
    this.url = url;
  }

  hasVehicles() {
    return this.vehicles.length > 0;
  }

  hasStarships() {
    return this.starships.length > 0;
  }

  appearsInFilms() {
    return this.films.length;
  }

  isHuman() {
    return this.species.length === 0 || this.species.includes('Human');
  }
}

module.exports = Person;
