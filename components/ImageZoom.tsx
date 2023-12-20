import { useRef, ComponentProps, RefCallback } from 'react';
import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom';
import Image from 'next/image';

type ImageZoomProps = ComponentProps<'img'> & {
  options?: ZoomOptions;
};

export function ImageZoom({ options, width, height, src, alt }: ImageZoomProps) {
  const zoomRef = useRef<Zoom | null>(null);

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom(options);
    }

    return zoomRef.current;
  }

  const attachZoom: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom();

    if (node) {
      zoom.attach(node);
    } else {
      zoom.detach();
    }
  };

  return (
    <Image
      ref={attachZoom}
      width={width as number}
      height={height as number}
      src={src as string}
      alt={alt as string}
    />
  );
}
