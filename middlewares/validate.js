const joi = require("joi");
const validateSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).max(15).required(),
});

module.exports = {
  validateSchema,
};
