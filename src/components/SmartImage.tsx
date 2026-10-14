import React, { useState, useEffect } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
  fallbackLabel?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  objectFit = 'cover',
  fallbackLabel = 'Smile Dental Care Clinic',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [attemptedFallback, setAttemptedFallback] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
    setAttemptedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!attemptedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setAttemptedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 bg-slate-900 text-white overflow-hidden ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-radial-gradient from-teal-900/40 via-slate-900 to-slate-950 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-300">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 8 .5 1.5 1 3.5 1.5 5 .3.9 1.2 1 1.7.5.8-.8 1.3-2 1.3-3.5 0-1.5.5-2.5 1-2.5s1 1 1 2.5c0 1.5.5 2.7 1.3 3.5.5.5 1.4.4 1.7-.5.5-1.5 1-3.5 1.5-5 1-3 2.5-5 2.5-8 0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.8 4 4.5 0 2.2-1.2 4-2.1 6.8-.5 1.5-1.1 3.4-1.4 4.7-.2-.5-.5-1.1-.5-2 0-2.2-1-3.5-2-3.5s-2 1.3-2 3.5c0 .9-.3 1.5-.5 2-.3-1.3-.9-3.2-1.4-4.7C7.2 12.5 6 10.7 6 8.5 6 5.8 7.5 4 12 4z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-teal-300 tracking-wide uppercase">
            {fallbackLabel}
          </span>
          <span className="text-xs text-slate-300 max-w-xs line-clamp-2">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
      referrerPolicy="no-referrer"
      className={`${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      } transition-opacity duration-300 ${className}`}
      {...rest}
    />
  );
};
