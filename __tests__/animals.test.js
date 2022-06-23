const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require('../lib/animals.js');
const { animals } = require('../data/animals.json');

jest.mock('fs');

test('creates an animal object', () => {
    const animal = createNewAnimal(
        { name: "Darlene", id: "a;sldkf"},
        animals
    );

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("a;sldkf");
});

test('filters by query', () => {
    const startingArray = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
          },
          {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
          },
    ];
    
    const updatedArray = filterByQuery({ species: 'gorilla' }, startingArray);

    expect(updatedArray.length).toEqual(1);
});

test('find an animal by id', () => {
    const animalsArray = [
        {
            id: "3",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky", "rash"],
          },
          {
            id: "4",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
          },
    ];
    const searchArray = findById('4', animalsArray);
    expect(searchArray.id).toBe('4');
    expect(searchArray.name).toBe('Noel');
    expect(searchArray.species).toBe('bear');
});

test('validates input for animal', () => {
    const animal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: ["quirky", "rash"],
      };

    const invalidAnimal = {
        id: "3",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
      };

    const pass = validateAnimal(animal);
    const fail = validateAnimal(invalidAnimal);

    expect(pass).toBe(true);
    expect(fail).toBe(false);
});