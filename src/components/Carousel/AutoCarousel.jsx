import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './AutoCarousel.css';

export default function AutoCarousel({
  images = [],
  delay = 3500,
  className = '',
  imgClassName = '',
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: false })]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (autoplayPlugin && typeof autoplayPlugin.play === 'function' && !autoplayPlugin.isPlaying()) {
      autoplayPlugin.play();
    }
  }, [emblaApi]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`embla-auto ${className}`} ref={emblaRef}>
      <div className="embla-auto__container">
        {images.map((item, index) => {
          const src = typeof item === 'string' ? item : item.src;
          const alt = typeof item === 'string' ? 'Imagen Ayres Dorados' : (item.alt || 'Imagen Ayres Dorados');
          return (
            <div className="embla-auto__slide" key={index}>
              <img
                src={src}
                alt={alt}
                className={`embla-auto__img ${imgClassName}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
