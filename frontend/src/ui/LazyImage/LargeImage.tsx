import type { ImgHTMLAttributes } from "react";

const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} />;
};

export default Image;
