const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');
const { hasUncaughtExceptionCaptureCallback } = require('process');

jest.mock('fs');

test('creates a new zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: "John", id: "asdf"},
        zookeepers
    );
    expect(zookeeper.name).toBe("John");
    expect(zookeeper.id).toBe("asdf");
});

test('filters by query', () => {
    const startingArray = [
        {
            id: "3",
            name: "Erica",
            favoriteAnimal: "gorilla",
            age: 25,
          },
          {
            id: "4",
            name: "Noel",
            favoriteAnimal: "bear",
            age: 32,
          },
    ];

    const updatedArray = filterByQuery({ name: 'Noel' }, startingArray);
    expect(updatedArray.length).toBe(1);
});

test('find zookeeper by id', () => {
    const zookeeperArray = [
        {
            id: "3",
            name: "Erica",
            favoriteAnimal: "gorilla",
            age: 25,
          },
          {
            id: "4",
            name: "Noel",
            favoriteAnimal: "bear",
            age: 32,
          },
    ];
    const searchArray = findById('4', zookeeperArray);
    expect(searchArray.id).toBe('4');
    expect(searchArray.name).toBe('Noel');
});

test('validates zookeeper input', () => {
    const zookeeper = {
        id: "3",
        name: "Erica",
        favoriteAnimal: "gorilla",
        age: 25,
      };

    const invalidZookeeper = {
        id: "3",
        name: "Erica",
        favoriteAnimal: "gorilla",
      };

    const pass = validateZookeeper(zookeeper);
    const fail = validateZookeeper(invalidZookeeper);

    expect(pass).toBe(true);
    expect(fail).toBe(false);
});