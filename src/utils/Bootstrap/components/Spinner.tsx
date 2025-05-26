import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

type SpinnerProps = {
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom' | undefined; 
  animation?: 'border' | 'grow';
  customSize?: string; 
};

export const Spinner: React.FC<SpinnerProps> = ({
  variant = '',
  size = 'sm',
  animation = 'border',
  customSize = '1rem', 
}) => {

  const getSizeStyle = () => {
    if (size === 'custom') {
      return { 
        width: customSize, 
        height: customSize,
        fontSize: `calc(${customSize} * 0.5)` 
      };
    }

    const sizeMap = {
      sm: { fontSize: '0.75rem' },
      md: { fontSize: '1rem' },
      lg: { fontSize: '1.5rem' },
      xl: { fontSize: '2rem' }
    };
    
    return size !== 'sm' ? sizeMap[size] : {};
  };

  return (
    <BootstrapSpinner
      animation={animation}
      role="status"
      variant={variant}
      size={size === 'sm' ? size : undefined} 
      style={getSizeStyle()}
    />
  );
};