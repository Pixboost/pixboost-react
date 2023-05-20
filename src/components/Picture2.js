import React from 'react';
import PropTypes from 'prop-types';
import {prepareSource} from '../util';

function generateSrcSet(sizes, dppx, op, config, src) {
  return sizes.reduce((srcSet, s) => {
    return `${srcSet}\n${config.domain.includes('//') ? '' : '//'}${
      config.domain
    }/api/2/img/${prepareSource(src)}/${op.replace('{SIZE}', s)}${
      op.includes('?') ? '&' : '?'
    }dppx=${dppx}&auth=${config.apiKey}`
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

function Picture({src, alt, config, breakpoints, minSize, maxSize, op}) {
  const sizes = [];
  for (let s = minSize; s <= maxSize; ) {
    sizes.push(s);
    if (s < 1000) {
      s += 100;
    } else {
      s += 200;
    }

    if (s > maxSize) {
      s = maxSize;
    }
  }

  return <picture>
    <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcSet={generateSrcSet(sizes, 2, op, config, src)}
    />
    <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcSet={generateSrcSet(sizes, 3, op, config, src)}
    />
    <img
      alt={alt}
      srcSet={generateSrcSet(sizes, 1, op, config, src)}
      sizes={sizesAttr(breakpoints, config)}
    />
  </picture>
}

Picture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  breakpoints: PropTypes.object.isRequired,
  minSize: PropTypes.number.isRequired,
  maxSize: PropTypes.number.isRequired,
  op: PropTypes.string.isRequired
}

export {Picture}