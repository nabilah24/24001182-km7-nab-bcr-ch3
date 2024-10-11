const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");

exports.getCars = (manufacture, model) => {
    const searchedCar = cars.filter((car) => {
        // Do filter logic here
        let result = true;
        if (manufacture) {
            const isFoundManufacture = car.manufacture
                .toLowerCase()
                .includes(manufacture.toLowerCase());
            result = result && isFoundManufacture;
        }
        if (model) {
            const isFoundModel = car.model
                .toLowerCase()
                .includes(model.toLowerCase());
            result = result && isFoundModel;
        }
        return result;
    });
    return searchedCar;
    // return cars;
};

exports.getCarById = (id) => {
    // Find Car by id using strict equality
    const car = cars.find((car) => car.id === id);
    return car || null; // Return null if the car is not found
};

exports.createCar = (data) => {
    // Generate uuid to define the new data id
    const newcar = {
        id: uuidv4(),
        ...data,
    };

    // Add data to current array cars 
    cars.push(newcar);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return newcar;
};

exports.updateCar = (id, data) => {
    // Find the existing car data
    const car = cars.find((car) => car.id === (id));
    if (!car) {
        // Make a error class
        throw new NotFoundError("Car is Not Found!");
    }

    // Update the data
    Object.assign(car, data);

    // Update the json data
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return car;
};

exports.deleteCarById = (id) => {
    // Find index
    const carIndex = cars.findIndex((car) => car.id == id);

    if (carIndex < 0) {
        // If no index found
        return null;
    }

    const deletedCar = cars.splice(carIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );
    return deletedCar;
};