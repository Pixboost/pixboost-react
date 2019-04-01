import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lozad from '../lozad';
import { prepareSource } from '../util';

class Image extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    this.setupLazyLoad();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      if (this.imgRef.current) {
        this.imgRef.current.removeAttribute('data-loaded');
      }
      this.setupLazyLoad();
    }
  }

  setupLazyLoad() {
    if (!this.imgRef.current) {
      return;
    }

    if (this.props.lazy) {
      const el = this.imgRef.current;
      const lozadInstance = lozad(el, {
        threshold: 0.01,
        rootMargin: '40px 0px 0px 0px'
      });

      lozadInstance.observe();
    }
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
      imgAttrs['data-src'] = imgSrc;
      imgAttrs['src'] =
        'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    } else {
      imgAttrs['src'] = imgSrc;
    }
    if (alt) {
      imgAttrs.alt = alt;
    }

    return <img {...imgAttrs} {...otherProps} ref={this.imgRef} />;
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
