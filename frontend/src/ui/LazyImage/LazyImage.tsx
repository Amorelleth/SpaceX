import { Suspense, lazy, useState, type ImgHTMLAttributes } from "react";

const LargeImage = lazy(() => import("./LargeImage"));

export const LazyImage = ({
  small,
  large,
  alt,
  ...rest
}: {
  small?: string;
  large?: string;
  alt: string;
} & ImgHTMLAttributes<HTMLImageElement>) => {
  const [src, setSrc] = useState(large ?? small);

  return src ? (
    <Suspense fallback={large ? <img src={small} alt={alt} {...rest} /> : null}>
      <LargeImage src={src} alt={alt} onError={() => setSrc(small)} {...rest} />
    </Suspense>
  ) : null;
};
