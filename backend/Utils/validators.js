import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) 
    {
      const result = await validation.run(req);
      if (!result.isEmpty()) 
      {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) 
    {
      return next();
    }
    return res.status(402).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required!"),
  body("password").trim().isLength({ min: 4 }).withMessage("Password should contain atleast 4 characters!")
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required!"),
  body("email").trim().isEmail().withMessage("Email is required!"),
  body("password").trim().isLength({ min: 4 }).withMessage("Password should contain atleast 4 characters!")
];
