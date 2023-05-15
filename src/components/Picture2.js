import React from 'react';
import PropTypes from 'prop-types';
import {prepareSource} from '../util';

function bpSrc(config, src, op, size) {

  return `${config.domain.includes('//') ? '' : '//'}${
    config.domain
  }/api/2/img/${prepareSource(bp.src)}/${op}${
    op.includes('?') ? '&' : '?'
  }auth=${config.apiKey}`;
}

function Picture({src, alt, config, breakpoints, minSize, maxSize, op}) {
  for (let i = 1; i < (maxSize - minSize) / 100; i++) {

  }

  return <picture>
    <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
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