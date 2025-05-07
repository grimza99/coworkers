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
    alt: '사람들이 함께 열차를 운행하는 모습이 표현된 상단 일러스트레이션',
  },
  bottom: {
    sm: bottomImageSm,
    md: bottomImageMd,
    lg: bottomImageLg,
    alt: '협업하는 사람들의 모습이 표현된 하단 일러스트레이션',
  },
};

type BackgroundImageProps = {
  variant: 'main' | 'bottom';
};

export default function BackgroundImage({ variant }: BackgroundImageProps) {
  const selectedSource = sources[variant];
  const common = {
    fill: true,
    priority: true,
    className: 'object-cover -z-1',
    alt: selectedSource.alt,
  };
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
      <source media="(max-width: 424px)" srcSet={mobile} />
      <source media="(min-width: 425px, max-width:1023px)" srcSet={tablet} />
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img {...rest} alt={selectedSource.alt} />
    </picture>
  );
}
