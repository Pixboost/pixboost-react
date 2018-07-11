import React, {Component} from 'react';
import PropTypes from 'prop-types';
import lozad from 'lozad';

class Image extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.lazy) {
      lozad(this.imgRef).observe();
    }
  }

  render() {
    const {config, src, alt, op, lazy, ...otherProps} = this.props;
    const imgAttrs = {};
    const imgSrc = `//${config.domain}/api/2/img/${src}/${op}${op.includes('?') ? '&' : '?'}auth=${config.apiKey}`;

    if (lazy) {
      imgAttrs['data-lazy'] = imgSrc;
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
  lazy: true
};

export default Image;