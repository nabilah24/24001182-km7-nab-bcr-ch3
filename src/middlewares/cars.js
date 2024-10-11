const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    manufacture: z.string().optional(),
    model: z.string().optional(),
    type: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails,return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
  // Make a validation schema
  const validationParams = z.object({
    id: z.string(),
  });

  const result = validationParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    option: z.array(z.string()),
    specs: z.array(z.string()),
  });

  // The file is not required
  const validateFileBody = z.object({
    carsImage: z.object({
      name: z.string(),
      data: z.any(),
    })
      .nullable()
      .optional(),
  })
    .nullable()
    .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validate fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validate fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  // Convert to car data format
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    available: req.body.available === 'true',
    options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };
  

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validate fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Validation body schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number(),
    capacity: z.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number(),
    option: z.array(z.string()),
    specs: z.array(z.string()),
  })

  const validateFileBody = z.object({
    carsImage: z.object({
      name: z.string(),
      data: z.any(),
    })
      .nullable()
      .optional(),
  })
    .nullable()
    .optional();

    // Validate
    // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validate fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validate fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  // Convert to car data format
  req.body = {
    ...req.body,
    rentPerDay: Number(req.body.rentPerDay),
    capacity: Number(req.body.capacity),
    year: Number(req.body.year),
    available: req.body.available === 'true',
    options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
    specs: Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs],
  };
  

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next()
}