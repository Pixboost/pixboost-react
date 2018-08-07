import React, {Component} from 'react';
import PropTypes from 'prop-types';
import lozad from '../lozad';
import {isElementInViewport, sourceWithProtocol} from '../util';

class Image extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.lazy) {
      const el = this.imgRef.current;
      const lozadInstance = lozad(el, {
        threshold: 0.01,
        rootMargin: '40px 0px 0px 0px',
      });
      if (isElementInViewport(el)) {
        lozadInstance.triggerLoad(el);
      } else {
        lozadInstance.observe();
      }
    }
  }

  render() {
    const {config, src, alt, op, lazy, ...otherProps} = this.props;
    const imgAttrs = {};
    const imgSrc = src.indexOf('data:') === 0 ?
      src :
      `${config.domain.includes('//') ? '' : '//'}${config.domain}/api/2/img/${sourceWithProtocol(src)}/${op}${op.includes('?') ? '&' : '?'}auth=${config.apiKey}`;

    if (lazy) {
      imgAttrs['data-src'] = imgSrc;
      imgAttrs['src'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    } else {
      imgAttrs['src'] = imgSrc;
    }
    if (alt) {
      imgAttrs.alt = alt;
    }

    return (
      <img {...imgAttrs} {...otherProps} ref={this.imgRef}/>
    );
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