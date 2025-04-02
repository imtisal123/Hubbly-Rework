// Helper functions for text formatting
export const capitalize = (str: string) => {
  if (!str) return '';
  return str.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatMobilityText = (city: boolean, country: boolean) => {
  if (city && country) {
    return 'Open to moving to a different city and country';
  }
  if (city) {
    return 'Open to moving to a different city';
  }
  if (country) {
    return 'Open to moving to a different country';
  }
  return 'No';
};

export const formatIncomeRange = (value: string) => {
  if (value === 'none') return 'No income';
  if (value === 'private') return 'Prefer not to say';
  
  // Extract the range values
  const matches = value.match(/(\d+)k-(\d+)k/);
  if (matches) {
    const [_, min, max] = matches;
    return `PKR ${min}k – ${max}k`;
  }
  
  // Handle special cases like "500k+"
  if (value.endsWith('+')) {
    const base = value.replace('+', '');
    return `PKR ${base}+`;
  }
  
  // Handle simple ranges like "0-50k"
  if (value.includes('-')) {
    const [min, max] = value.split('-');
    return `PKR ${min} – ${max}`;
  }
  
  return `PKR ${value}`;
};

export const formatLivingArrangement = (withFamily: boolean) => {
  return withFamily ? 'Lives with family' : 'Lives independently from family';
};