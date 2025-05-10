/**
 * Prepares the document for PDF printing with optimized settings
 * This ensures consistent styling and layout when saving as PDF
 */
export const preparePdfPrint = () => {
    // Store original styles to restore later
    const originalOverflow = document.body.style.overflow;
    const originalBackground = document.body.style.background;
    
    // Set optimal styles for PDF printing
    document.body.style.overflow = 'auto';
    document.body.style.background = 'white';
    
    // Force all print styles to be applied
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleSheet => {
      if (styleSheet.sheet) {
        const rules = styleSheet.sheet.cssRules;
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (rule.type === CSSRule.MEDIA_RULE && rule.conditionText.includes('print')) {
            // Apply print styles immediately
            const printRules = rule.cssRules;
            for (let j = 0; j < printRules.length; j++) {
              try {
                document.styleSheets[0].insertRule(printRules[j].cssText, document.styleSheets[0].cssRules.length);
              } catch (e) {
                console.warn('Could not insert rule: ', e);
              }
            }
          }
        }
      }
    });
    
    // Return function to restore original settings
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.background = originalBackground;
    };
  };
  
  /**
   * Enhanced print function that optimizes for PDF output
   * Opens the print dialog and handles proper styling
   */
  export const printAsPdf = () => {
    const restoreStyles = preparePdfPrint();
    
    setTimeout(() => {
      window.print();
      
      // Restore original styles after printing
      setTimeout(restoreStyles, 1000);
    }, 300);
  };
  
  /**
   * Checks if the content fits on a single page
   * @returns {boolean} True if content likely fits on one page
   */
  export const checkContentFitsOnePage = () => {
    const content = document.querySelector('.printable-content');
    if (!content) return true;
    
    // A4 paper height is approximately 1123px at 96dpi
    // Subtracting margins and some buffer
    const maxHeight = 1050; 
    const contentHeight = content.scrollHeight;
    
    return contentHeight <= maxHeight;
  };
  
  /**
   * Automatically scales content to fit on one page if necessary
   * @param {number} maxScale Maximum scale factor to apply (1 = 100%)
   */
  export const autoScaleToFitPage = (maxScale = 0.9) => {
    const content = document.querySelector('.printable-content');
    if (!content) return;
    
    // A4 paper height (minus margins)
    const maxHeight = 1050;
    const contentHeight = content.scrollHeight;
    
    if (contentHeight > maxHeight) {
      // Calculate scale needed to fit on one page
      const scale = Math.min(maxScale, maxHeight / contentHeight);
      
      // Apply transform origin at top to maintain header positioning
      content.style.transformOrigin = 'top center';
      content.style.transform = `scale(${scale})`;
      
      // Adjust container height to match scaled content
      const parent = content.parentElement;
      if (parent) {
        parent.style.height = `${contentHeight * scale}px`;
        parent.style.overflow = 'hidden';
      }
    }
  };