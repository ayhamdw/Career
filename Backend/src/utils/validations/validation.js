const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15).trim(true).required(),
    lastName: Joi.string().min(3).max(15).trim(true).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().min(4).required(),
    dateOfBirth: Joi.string().min(6).required(),
    phoneNumber: Joi.string().min(10).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
