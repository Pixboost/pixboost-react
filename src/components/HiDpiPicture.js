import React from 'react';
import PropTypes from 'prop-types';
import {prepareSource} from '../util';

function generateSrcSet(bp, widths, dppx, config, src) {
  const imageHeight = dppx * bp.height;

  return widths.reduce((srcSet, w) => {
    const imageWidth = w * dppx
    return `${srcSet}${srcSet.length != 0 ? ',' : ''}\n${config.domain.includes('//') ? '' : '//'}${
      config.domain
    }/api/2/img/${prepareSource(src)}/${bp.op.replace('{WIDTH}', imageWidth).replace('{HEIGHT}', imageHeight)}${
      bp.op.includes('?') ? '&' : '?'
    }dppx=${dppx}&auth=${config.apiKey} ${imageWidth}w`
  }, '')
}

function sizesAttr(breakpoints, config) {
  return Object.keys(breakpoints).reduce((sizes, bpKey) => {
    let newSizes = sizes;
    if (newSizes.length > 0) {
      newSizes += ', ';
    }

    if (config.breakpoints[bpKey]['media']) {
      newSizes += config.breakpoints[bpKey]['media'];
      newSizes += ' ';
    }
    newSizes += breakpoints[bpKey]['size'];

    return newSizes;
  }, '')
}

function HiDpiPicture({src, alt, config, breakpoints, minWidth, maxWidth, imgProps, lazy}) {
  const sizes = [];
  for (let s = minWidth; s < maxWidth; ) {
    sizes.push(s);
    if (s < 1000) {
      s += 100;
    } else {
      s += 200;
    }

    if (s > maxWidth) {
      s = maxWidth;
    }
  }
  sizes.push(maxWidth);

  return <picture>
    {Object.keys(breakpoints).map(bpKey => {
      const bpConfig = config.breakpoints[bpKey];
      const bp = breakpoints[bpKey];

      let bpConfigMedia = '';
      if (bpConfig.media) {
        bpConfigMedia = ` and ${bpConfig.media}`;
      }
      return <React.Fragment key={`${src}${bpKey}`}>
        <source
          media={`(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)${bpConfigMedia}`}
          srcSet={generateSrcSet(bp, sizes, 2, config, src)}
          sizes={sizesAttr(breakpoints, config)}
        />
        <source
          media={`(-webkit-min-device-pixel-ratio: 3)${bpConfigMedia}`}
          srcSet={generateSrcSet(bp, sizes, 3, config, src)}
          sizes={sizesAttr(breakpoints, config)}
        />
        <source
          media={`(-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 1.9999)${bpConfigMedia}`}
          srcSet={generateSrcSet(bp, sizes, 1, config, src)}
          sizes={sizesAttr(breakpoints, config)}
        />
      </React.Fragment>
    })}
    <img
      alt={alt}
      src={prepareSource(src)}
      {...imgProps}
      {...(lazy && {loading: 'lazy'})}
    />
  </picture>
}

HiDpiPicture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  breakpoints: PropTypes.object.isRequired,
  minWidth: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  imgProps: PropTypes.object,
  lazy: PropTypes.bool
}

export {HiDpiPicture}