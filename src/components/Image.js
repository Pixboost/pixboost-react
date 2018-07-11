import {Component} from 'react';
import PropTypes from 'prop-types';
import lozad from 'lozad';

class Image extends Component {
  render() {
    const {config, src, alt, op} = this.props;
    return (
      <img
        src={`//${config.domain}/api/2/img/${src}/${op}${op.includes('?') ? '&' : '?'}auth=${config.apiKey}`}
        alt={alt || ''}
      />
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  op: PropTypes.string,
  config: PropTypes.object.isRequired
};

export default {Image};