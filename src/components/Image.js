import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareSource } from '../util';

class Image extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { config, src, alt, op, lazy, ...otherProps } = this.props;

    if (!src || !config) {
      return null;
    }

    const imgAttrs = {};
    const imgSrc =
      src.indexOf('data:') === 0
        ? src
        : `${config.domain.includes('//') ? '' : '//'}${
          config.domain
        }/api/2/img/${prepareSource(src)}/${op}${
          op.includes('?') ? '&' : '?'
        }auth=${config.apiKey}`;

    if (lazy) {
      imgAttrs['loading'] = 'lazy';
    }
    imgAttrs['src'] = imgSrc;
    if (alt) {
      imgAttrs.alt = alt;
    }

    return <img {...imgAttrs} {...otherProps}/>;
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  op: PropTypes.string,
  lazy: PropTypes.bool,
  config: PropTypes.object.isRequired
};

Image.defaultProps = {
  lazy: true,
  op: 'optimise'
};

export default Image;
