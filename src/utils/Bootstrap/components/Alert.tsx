import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

type AlertProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string; 
  style?: React.CSSProperties; 
};

export const Alert: React.FC<AlertProps> = ({ 
  text, 
  variant = 'primary', 
  className = '', 
  style = {} 
}) => {
  return (
    <BootstrapAlert 
      variant={variant}
      className={className}
      style={{
        margin: 0,
        padding: '0.25rem 0.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        lineHeight: 1,
        ...style 
      }}
    >
      {text}
    </BootstrapAlert>
  );
};