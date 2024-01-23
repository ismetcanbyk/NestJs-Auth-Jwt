import * as bcrypt from 'bcrypt';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{8,})$/;

export const validatePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validatePasswordStrength = (password: string) => {
  return passwordRegex.test(password);
};
