import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

//given constraints for a task
export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .trim()
    .isLength({min: 20})
    .withMessage("Description must be at least 20 characters"),

  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be Pending', 'In Progress'or 'Completed'."),
];
export const updateTaskValidation = [
  body("status")
    .isIn(["Pending","In Progress","Completed"])
    .withMessage(
      "Status must be 'Pending','In Progress' or 'Completed'."
    ),
];

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()});
    return;
  }

  next();
};