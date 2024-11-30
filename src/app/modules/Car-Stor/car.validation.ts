import Joi from 'joi';

// Define Joi schema for validation
const carSchemaValidation = Joi.object({
  brand: Joi.string(),
  model: Joi.string().required(),
  year: Joi.number().integer().min(1886).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string()
    .valid('Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible')
    .required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  inStock: Joi.boolean().required(),
});

export default carSchemaValidation;
