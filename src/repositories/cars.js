const fs = require("fs");
const students = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");

exports.getCars = (manufacture, model, type) => {
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

    if (type) {
      const isFoundType = car.model
        .toLowerCase()
        .includes(type.toLowerCase());
      result = result && isFoundType;
    }

    return result;
  });
  return searchedCar;
};

exports.getCarById = (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

exports.createCar = (data) => {
  // Generate uuid to define the new data id
  const newCar = {
    id: uuidv4(),
    ...data,
  };

  // Add data to current array cars
  cars.push(newCar);

  // Save the latest data to json
  fs.writeFileSync(
    "./data/cars.json",
    JSON.stringify(cars, null, 4),
    "utf-8"
  );

  return newCar;
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
  const carIndex = cars.findIndex((car) => students.id == id);

  if (carIndex < 0) {
    // If no index found
    return null;
  }

  const deleteCar = car.splice(carIndex, 1);

  // Update the json
  fs.writeFileSync(
    "./data/cars.json",
    JSON.stringify(car, null, 4),
    "utf-8"
  );
  return deleteCar;
};