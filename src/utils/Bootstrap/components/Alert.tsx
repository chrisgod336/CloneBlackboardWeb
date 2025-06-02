import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

type AlertProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  textAlign?: any;
  className?: string; 
  style?: React.CSSProperties; 
};

export const Alert: React.FC<AlertProps> = ({ 
  text, 
  variant = 'primary', 
  className = '', 
  textAlign,
  style = {} 
}) => {
  const renderTextWithBreaks = () => {
    if(text){
      return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }else{
      return ''
    }
  };

  return (
    <BootstrapAlert 
      variant={variant}
      className={className}
      style={{
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center', 
        minHeight: '32px', 
        lineHeight: 0.7,
        width: '100%',
        ...style 
      }}
    >
      <div style={{textAlign: (textAlign??'left'), width: '100%'}}>
        {renderTextWithBreaks()}
      </div>
    </BootstrapAlert>
  );
};