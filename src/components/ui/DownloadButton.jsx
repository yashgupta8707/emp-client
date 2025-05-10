import React from 'react';
import { Download, Printer } from 'lucide-react';
import { printAsPdf } from '../../utils/pdf-utils';

/**
 * Button component for downloading/printing PDFs
 * 
 * @param {Object} props Component props
 * @param {string} props.variant Button variant (primary or secondary)
 * @param {string} props.label Button label text
 * @param {Function} props.onClick Custom click handler (default is to print)
 */
const DownloadButton = ({ 
  variant = 'primary', 
  label = 'Download PDF',
  icon = 'download',
  onClick = printAsPdf,
  className = '',
  ...props 
}) => {
  // Button style variants
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  // Icon components
  const icons = {
    download: <Download size={20} />,
    print: <Printer size={20} />
  };
  
  // Get icon component
  const IconComponent = icons[icon] || icons.download;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {IconComponent}
      {label}
    </button>
  );
};

export default DownloadButton;