const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = () => {
    return carRepository.getCars();
};

exports.getCarById = (id) => {
    const car = carRepository.getCarById(id);

    // Check if car is not found
    if (!car) { 
        throw new NotFoundError("Car is Not Found!");
    }

    return car; // Return the found car
};

exports.createCar = async (data, file) => {
    // Upload file to image kit
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }
    return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
    // Check if the car exists
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car Not Found!"); // Corrected error message for clarity
    }

    // Replicated existing data with new data
    data = {
        ...existingCar,
        ...data,
    };

    // Upload file to image kit
    if (file?.image) {
        // If a new file is uploaded, update the Image
        data.image = await imageUpload(file.image);
    } else {
        // Keep the existing profile picture
        data.image = existingCar.image;
    }

    // Attempt to update the car data
    const updatedCar = carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update car!"]); // Check if the update failed
    }

    // Return the updated car data
    return updatedCar;
};

exports.deleteCarById = (id) => {
    // find car is exist or not
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // if exist, we will delete the car data
    const deletedCar = carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to update car!"]);
    }

    return deletedCar;
};