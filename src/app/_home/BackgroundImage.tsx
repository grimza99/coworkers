import { getImageProps } from 'next/image';
import mainImageSm from '@/../public/images/landing-main-sm.png';
import mainImageMd from '@/../public/images/landing-main-md.png';
import mainImageLg from '@/../public/images/landing-main-lg.png';
import bottomImageSm from '@/../public/images/landing-bottom-sm.png';
import bottomImageMd from '@/../public/images/landing-bottom-md.png';
import bottomImageLg from '@/../public/images/landing-bottom-lg.png';

const mainCommonAttributes = {
  fill: true,
  priority: true,
  className: 'object-cover -z-1',
  alt: '사람들이 함께 열차를 운행하는 모습이 표현된 상단 일러스트레이션',
};

export function MainBackgroundImage() {
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...mainCommonAttributes,
    src: mainImageSm,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...mainCommonAttributes,
    src: mainImageMd,
  });
  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({
    ...mainCommonAttributes,
    src: mainImageLg,
  });

  return (
    <picture>
      <source media="(max-width: 424px)" srcSet={mobile} />
      <source media="(min-width: 425px, max-width:1023px)" srcSet={tablet} />
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img {...rest} alt={mainCommonAttributes.alt} />
    </picture>
  );
}

const bottomCommonAttributes = {
  fill: true,
  priority: true,
  className: 'object-cover -z-1',
  alt: '협업하는 사람들의 모습이 표현된 하단 일러스트레이션',
};

export function BottomBackgroundImage() {
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    ...bottomCommonAttributes,
    src: bottomImageSm,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...bottomCommonAttributes,
    src: bottomImageMd,
  });
  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({
    ...bottomCommonAttributes,
    src: bottomImageLg,
  });

  return (
    <picture>
      <source media="(max-width: 639px)" srcSet={mobile} />
      <source media="(min-width: 640px, max-width:1023px)" srcSet={tablet} />
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <img {...rest} alt={bottomCommonAttributes.alt} />
    </picture>
  );
}
