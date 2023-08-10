import { checkSchema } from "express-validator";

// Donors

export const validateAddDonorFields = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
  },
  dob: {
    optional: true,
    isISO8601: true,
  },
  phone: {
    notEmpty: true,
    isString: true,
  },
  address: {
    optional: true,
    isString: true,
  },
  bloodType: {
    notEmpty: true,
    isIn: { options: [["A", "B", "O", "AB", "-A", "-B", "-O", "-AB"]] },
  },
  userId: {
    notEmpty: true,
    isInt: { options: { min: 1 } },
  },
});

export const validateUpdateDonorFields = checkSchema({
  name: {
    optional: true,
    isString: true,
  },
  dob: {
    optional: true,
    isISO8601: true,
  },
  phone: {
    optional: true,
    isString: true,
  },
  address: {
    optional: true,
    isString: true,
  },
  bloodType: {
    optional: true,
    isIn: { options: [["A", "B", "O", "AB", "-A", "-B", "-O", "-AB"]] },
  },
  userId: {
    notEmpty: true,
    isInt: { options: { min: 1 } },
  },
});
