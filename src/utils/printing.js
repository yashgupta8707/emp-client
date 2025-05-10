/**
 * Open print dialog to download PDF
 */
export const downloadPDF = () => {
  // Create a clone of the current page
  const printContent = document.body.innerHTML;
  
  // Create new window for printing
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Quotation</title>');
  printWindow.document.write('<style>body{font-family: Arial, sans-serif;}</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(document.querySelector('.quotation-view')?.innerHTML || '');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  
  // Print the content and then close the window
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 100);
};