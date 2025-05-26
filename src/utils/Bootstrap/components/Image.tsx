import React from 'react';
import { Image as BootstrapImage } from 'react-bootstrap';

type DynamicImageProps = {
  src: string;
  alt?: string;
  rounded?: boolean;
  fluid?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
};

export const Image: React.FC<DynamicImageProps> = ({
  src,
  alt = '',
  rounded = false,
  fluid = true,
  width,
  height,
  className = ''
}) => {
  return (
    <BootstrapImage
      src={src}
      alt={alt}
      rounded={rounded}
      fluid={fluid}
      width={width}
      height={height}
      className={className}
    />
  );
};
