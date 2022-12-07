export const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const getDayFromMonday = (): number => {
  const currentDay = new Date().getDay();
  return currentDay === 0 ? 6 : currentDay - 1;
}

export const toUSAFormat = (hours: number): string => {
  let h = hours % 12;
  if (h === 0) h = 12;
  return Math.round(h) + (hours < 12 ? ' AM' : ' PM');
}
