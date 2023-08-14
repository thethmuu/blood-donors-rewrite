import { checkSchema } from "express-validator";

// Auth

export const validateRegisterUserFields = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
});

export const validateLogInUserFields = checkSchema({
  email: {
    notEmpty: true,
    isEmail: true,
  },
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars",
    },
  },
});

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

// Donations

export const validateAddDonationFields = checkSchema({
  lastDate: {
    notEmpty: true,
    isISO8601: true,
  },
  donorId: {
    notEmpty: true,
    isInt: { options: { min: 1 } },
  },
  userId: {
    notEmpty: true,
    isInt: { options: { min: 1 } },
  },
});

export const validateUpdateDonationFields = checkSchema({
  lastDate: {
    optional: true,
    isISO8601: true,
  },
  donorId: {
    optional: true,
    isInt: { options: { min: 1 } },
  },
  userId: {
    notEmpty: true,
    isInt: { options: { min: 1 } },
  },
});
