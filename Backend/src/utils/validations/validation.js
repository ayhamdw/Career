const Joi = require("joi");
const signupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required().trim().messages({
      "string.base": "Username must be a string.",
      "string.empty": "Username cannot be empty.",
      "string.min": "Username must have at least 3 characters.",
      "string.max": "Username must have at most 20 characters.",
      "any.required": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.empty": "Email cannot be empty.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(8).max(30).required().messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password must have at least 8 characters.",
      "string.max": "Password must have at most 30 characters.",
      "string.pattern.base":
        "Password must contain at least one letter and one number.",
      "any.required": "Password is required.",
    }),
    role: Joi.string().valid("user", "provider").required().messages({
      "any.only": "Role must be either 'user' or 'provider'.",
      "any.required": "Role is required.",
    }),
    profile: Joi.object({
      firstName: Joi.string().min(3).max(30).trim().required().messages({
        "string.base": "First name must be a string.",
        "string.empty": "First name cannot be empty.",
        "string.min": "First name must have at least 3 characters.",
        "string.max": "First name must have at most 30 characters.",
        "any.required": "First name is required.",
      }),
      lastName: Joi.string().min(3).max(30).trim().required().messages({
        "string.base": "Last name must be a string.",
        "string.empty": "Last name cannot be empty.",
        "string.min": "Last name must have at least 3 characters.",
        "string.max": "Last name must have at most 30 characters.",
        "any.required": "Last name is required.",
      }),
      profileImage: Joi.string().optional(),
      ratings: Joi.array().items().optional(),
      phone: Joi.string()
        .pattern(/^\+?[0-9]{10,15}$/)
        .required()
        .messages({
          "string.empty": "Phone number cannot be empty.",
          "string.pattern.base":
            "Phone number must contain 10-15 digits and may include a leading '+' sign.",
          "any.required": "Phone number is required.",
        }),
      bio: Joi.string().max(500).optional().messages({
        "string.base": "Bio must be a string.",
        "string.max": "Bio must not exceed 500 characters.",
      }),
      experience: Joi.string().max(500).optional().messages({
        "string.base": "Experience must be a string.",
        "string.max": "Experience must not exceed 500 characters.",
      }),
      location: Joi.object({
        type: Joi.string().valid("Point").required(),
        coordinates: Joi.array()
          .items(Joi.number())
          .length(2)
          .required()
          .messages({
            "array.length":
              "Coordinates must have exactly two numbers (longitude and latitude).",
          }),
      }).required(),
    }).required(),
    verificationStatus: Joi.boolean().optional(),
    tokens: Joi.array().items().required(),
    friendRequests: Joi.array().items().required(),
    friends: Joi.array().items().required(),
    sendRequests: Joi.array().items().required(),
    resetCode: Joi.number().optional(),
    resetCodeExpires: Joi.date().optional().default(null),
  });

  return schema.validate(data, { abortEarly: false });
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
