import React from 'react';

/**
 * A component that adds a watermark to a PDF or printable content
 * 
 * @param {Object} props Component props
 * @param {string} props.text Text to display as watermark
 * @param {string} props.image Optional image URL to use as watermark
 * @param {number} props.opacity Opacity of the watermark (0-1)
 * @param {number} props.rotate Rotation angle in degrees
 * @param {string} props.color Text color for the watermark
 */
const Watermark = ({ 
  text = 'EMPRESS PC', 
  image = null, 
  opacity = 0.05, 
  rotate = -30, 
  color = '#1e3a8a', 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden print:opacity-100 ${className}`}
      style={{ opacity }}
      {...props}
    >
      {image ? (
        <img 
          src={image} 
          alt="Watermark" 
          className="max-w-[150%] max-h-[150%] object-contain select-none opacity-30"
          style={{ transform: `rotate(${rotate}deg)` }}
        />
      ) : (
        <div 
          className="text-[200px] md:text-[250px] font-bold text-center select-none"
          style={{ 
            color, 
            transform: `rotate(${rotate}deg)`,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Watermark;