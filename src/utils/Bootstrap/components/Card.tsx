import React, { ReactNode } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

type CustomCardProps = {
  variant?: string;
  children?: ReactNode;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
};

export const Card: React.FC<CustomCardProps> = ({
  variant = 'light',
  children,
  onClick,
  width,
  height
}) => {
  return (
    <BootstrapCard
      bg={variant}
      text={variant === 'light' ? 'dark' : 'white'}
      className="mb-2"
      onClick={onClick}
      style={{ width, height, cursor: onClick ? 'pointer' : undefined }}
    >
      <BootstrapCard.Body>
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};
