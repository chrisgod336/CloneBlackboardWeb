import React from 'react';

type DynamicVideoProps = {
  src: string;
  width?: string | number;
  height?: string | number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
};

export const Video: React.FC<DynamicVideoProps> = ({
  src,
  width = '100%',
  height,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  className = ''
}) => {
  return (
    <video
      src={src}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      className={className}
    >
      Seu navegador não suporta o elemento <code>video</code>.
    </video>
  );
};
