import Image from 'next/image';
import { useState, memo } from 'react';

// XXX nextImage issue Till I found a better solution...

function Img(props) {
  const [imgSizes, setimgSizes] = useState({
    naturalWidth: 1,
    naturalHeight: 1,
  });
  const onLoadingComplete = (size) => {
    if (imgSizes.naturalHeight !== 1) {
      return;
    }
    size.naturalHeight !== imgSizes.naturalHeight && setimgSizes({ ...size });
  };
  return (
    <Image
      {...props}
      alt={props.alt}
      priority
      width={imgSizes.naturalWidth}
      height={imgSizes.naturalHeight}
      onLoadingComplete={onLoadingComplete}
    />
  );
}

export default Img;
