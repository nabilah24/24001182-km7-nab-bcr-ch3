const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (manufacture, model, type) => {
  return carRepository.getCars(manufacture, model, type);
};

exports.getCarById = (id) => {
  const car = carRepository.getCarById(id);
  if (!car) {
    throw new NotFoundError("Car is Not Found!");
  }

  return car;
};

exports.createCar = async (data, file) => {
  // Upload file to image kit
  if (file?.carsImage) {
    data.carsImage = await imageUpload(file.carsImage);
  }

  // Create the data
  return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
  // Find car is exist or not (validate the data)
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // Replicated existing data with new data
  data = {
    ...existingCar, // existing Car
    ...data,
  };

  // Upload file to image kit
  if (file?.carsImage) {
    data.carsImage = await imageUpload(file.carsImage);
  }

  // If exist, it will update the car data
  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw InternalServerError(["Failed to update car!"]);
  }

  return updatedCar;
};

exports.deleteCarById = (id) => {
  // Find car is exist or not (validate the data)
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // If exist, it will delete the car data
  const deletedCar = carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete car!"]);
  }

  return deletedCar;
};