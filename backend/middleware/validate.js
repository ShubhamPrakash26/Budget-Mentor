const Joi = require("joi");

exports.validateBudget = (req, res, next) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required(),
    description: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};
