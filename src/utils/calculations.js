/**
 * Calculate totals for all selected items
 * @param {Array} selectedItems - Array of selected items 
 * @returns {Object} Object containing different total calculations
 */
export const calculateTotals = (selectedItems) => {
  let subtotal = 0;
  let totalGst = 0;
  let totalProfit = 0;
  let hsnTotals = {};

  selectedItems.forEach(item => {
    if (item.component) {
      const price = item.isCustomPrice ? item.customPrice : item.basePrice;
      const itemTotal = price * item.quantity;
      const gstAmount = (itemTotal * item.gst) / 100;
      
      // Calculate profit (sale price - purchase price) per unit before GST
      const profitPerUnit = price - item.purchasePrice;
      const totalItemProfit = profitPerUnit * item.quantity;
      
      subtotal += itemTotal;
      totalGst += gstAmount;
      totalProfit += totalItemProfit;

      // Group by HSN
      if (!hsnTotals[item.hsn]) {
        hsnTotals[item.hsn] = {
          taxableAmount: 0,
          cgst: 0,
          sgst: 0,
          totalTax: 0,
        };
      }
      hsnTotals[item.hsn].taxableAmount += itemTotal;
      hsnTotals[item.hsn].cgst += gstAmount / 2;
      hsnTotals[item.hsn].sgst += gstAmount / 2;
      hsnTotals[item.hsn].totalTax += gstAmount;
    }
  });

  return {
    subtotal,
    totalGst,
    grandTotal: subtotal + totalGst,
    totalProfit,
    hsnTotals,
  };
};