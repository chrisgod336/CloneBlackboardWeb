import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

type IconProps = {
  name: IconProp;
  color?: string;
  size?: SizeProp;
};

export const Icon: React.FC<IconProps> = ({ name, color, size = '1x' }) => {
  return <FontAwesomeIcon icon={name} color={color} size={size} />;
};
