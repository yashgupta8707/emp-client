/**
 * Format number as Indian Rupee currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Convert number to words (Indian currency format)
 * @param {number} num - Number to convert
 * @returns {string} Number in words
 */
export const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

  if (num === 0) return 'Zero';

  let word = '';
  let i = 0;

  const isDecimal = num % 1 !== 0;
  const rupees = Math.floor(num);
  const paise = isDecimal ? Math.round((num - rupees) * 100) : 0;

  // Convert rupees to words
  let remainingRupees = rupees;
  while (remainingRupees > 0) {
    let chunk = 0;
    if (i === 0) chunk = remainingRupees % 1000;
    else chunk = remainingRupees % 100;

    if (chunk) {
      let chunkWord = '';
      if (chunk < 10) chunkWord = ones[chunk];
      else if (chunk < 20) chunkWord = teens[chunk - 10];
      else {
        chunkWord = tens[Math.floor(chunk / 10)];
        if (chunk % 10) chunkWord += ' ' + ones[chunk % 10];
      }
      word = chunkWord + (thousands[i] ? ' ' + thousands[i] : '') + (word ? ' ' + word : '');
    }

    if (i === 0) remainingRupees = Math.floor(remainingRupees / 1000);
    else remainingRupees = Math.floor(remainingRupees / 100);
    i++;
  }

  let result = word + ' Rupees';

  // Add paise if any
  if (paise > 0) {
    result += ' and ';
    if (paise < 10) result += ones[paise];
    else if (paise < 20) result += teens[paise - 10];
    else {
      result += tens[Math.floor(paise / 10)];
      if (paise % 10) result += ' ' + ones[paise % 10];
    }
    result += ' Paisa';
  }

  return result + ' only';
};