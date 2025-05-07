import { getImageProps } from 'next/image';
import mainImageSm from '@/../public/images/landing-main-sm.png';
import mainImageMd from '@/../public/images/landing-main-md.png';
import mainImageLg from '@/../public/images/landing-main-lg.png';
import bottomImageSm from '@/../public/images/landing-bottom-sm.png';
import bottomImageMd from '@/../public/images/landing-bottom-md.png';
import bottomImageLg from '@/../public/images/landing-bottom-lg.png';

const sources = {
  main: {
    sm: mainImageSm,
    md: mainImageMd,
    lg: mainImageLg,
  },
  bottom: {
    sm: bottomImageSm,
    md: bottomImageMd,
    lg: bottomImageLg,
  },
};

type BackgroundImageProps = {
  variant: 'main' | 'bottom';
};

export default function BackgroundImage({ variant }: BackgroundImageProps) {
  const selectedSource = sources[variant];
  const common = { fill: true, priority: true, className: 'object-cover -z-1', alt: '배경 이미지' };
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...common,
    src: selectedSource.sm,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    src: selectedSource.md,
  });
  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({
    ...common,
    src: selectedSource.lg,
  });

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobile} />
      <source media="(min-width: 640px, max-width:1023px)" srcSet={tablet} />
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img {...rest} alt="배경 이미지" />
    </picture>
  );
}
