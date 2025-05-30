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
  height = 'auto',
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  className = ''
}) => {
  const isYouTubeLink = () => {
    return src.includes('youtube.com') || src.includes('youtu.be');
  };

  const getYouTubeId = () => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = src.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isYouTubeLink()) {
    const videoId = getYouTubeId();
    const embedUrl = `https://www.youtube.com/embed/${videoId}?${
      autoPlay ? 'autoplay=1&' : ''
    }${controls ? '' : 'controls=0&'}${muted ? 'mute=1&' : ''}${
      loop ? 'loop=1&playlist=' + videoId + '&' : ''
    }rel=0`;

    return (
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

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