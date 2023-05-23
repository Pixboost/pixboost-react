import React from 'react';
import PropTypes from 'prop-types';
import {prepareSource} from '../util';

function srcSetAttr(bp, widths, dppx, config, src) {
  const imageHeight = dppx * bp.height;
  const query = `${bp.op.includes('?') ? '&' : '?'}dppx=${dppx}&auth=${config.apiKey}`
  const scheme = config.domain.includes('//') ? '' : '//';

  return widths.reduce((srcSet, w) => {
    const imageWidth = w * dppx
    const op = `${bp.op.replace('{WIDTH}', imageWidth).replace('{HEIGHT}', imageHeight)}`;

    return `${srcSet}${srcSet.length !== 0 ? ',' : ''}\n${scheme}${config.domain}/api/2/img/${prepareSource(src)}/${op}${query} ${imageWidth}w`
  }, '')
}

function sizesAttr(breakpoints, config) {
  return Object.keys(breakpoints).
    // A breakpoint without media query must go last
    sort((bp1, bp2) => {
      const media1 = config.breakpoints[bp1]['media'];
      const media2 = config.breakpoints[bp2]['media'];

      if (!media1) {
        return 1;
      }
      if (!media2) {
        return -1;
      }

      return 0;
    }).
    reduce((sizes, bpKey) => {
      let newSizes = sizes;
      if (newSizes.length > 0) {
        newSizes += ', ';
      }

      const mediaQuery = config.breakpoints[bpKey]['media'];
      if (mediaQuery) {
        newSizes += `${mediaQuery} `;
      }
      newSizes += breakpoints[bpKey]['width'];

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

      if (!bpConfig) {
        throw new Error(`could not find breakpoint [${bpKey}] in the config`)
      }

      let bpConfigMedia = '';
      if (bpConfig.media) {
        bpConfigMedia = ` and ${bpConfig.media}`;
      }
      return <React.Fragment key={`${src}${bpKey}`}>
        <source
          media={`(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)${bpConfigMedia}`}
          srcSet={srcSetAttr(bp, sizes, 2, config, src)}
          sizes={sizesAttr(breakpoints, config)}
        />
        <source
          media={`(-webkit-min-device-pixel-ratio: 3)${bpConfigMedia}`}
          srcSet={srcSetAttr(bp, sizes, 3, config, src)}
          sizes={sizesAttr(breakpoints, config)}
        />
        <source
          media={`(-webkit-min-device-pixel-ratio: 1) and (-webkit-max-device-pixel-ratio: 1.9999)${bpConfigMedia}`}
          srcSet={srcSetAttr(bp, sizes, 1, config, src)}
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
  breakpoints: PropTypes.objectOf(PropTypes.shape({
    width: PropTypes.string.isRequired,
    op: PropTypes.string.isRequired,
    height: PropTypes.number
  })).isRequired,
  minWidth: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  imgProps: PropTypes.object,
  lazy: PropTypes.bool
}

export {HiDpiPicture}