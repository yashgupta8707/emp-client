/**
 * Generate unique estimate number
 * Uses format EPC/E/YYYY/MM##### where ##### is a random 5-digit number
 * @returns {string} Unique estimate number
 */
export const generateEstimateNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(5, '0');
  return `EPC/E/${year}/${month}${random}`;
};