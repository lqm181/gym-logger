export const isAfterToday = (date: Date) => {
  return new Date(date) >= new Date(new Date().setHours(0, 0, 0));
};
