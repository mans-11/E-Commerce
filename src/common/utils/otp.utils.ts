export const generateOtp = (): string => {
  return String(Math.floor(Math.random() * (90000 - 100000) + 100000));
};
