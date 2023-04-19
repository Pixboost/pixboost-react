import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prepareSource } from '../util';

class Picture extends Component {
  constructor(props) {
    super(props);
  }

  static bpSrc(config, bp) {
    if (bp.hide || !bp.src) {
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }

    if (bp.src.indexOf('data:') === 0) {
      return bp.src;
    }
    const op = bp.op || 'optimise';

    return `${config.domain.includes('//') ? '' : '//'}${
      config.domain
    }/api/2/img/${prepareSource(bp.src)}/${op}${
      op.includes('?') ? '&' : '?'
    }auth=${config.apiKey}`;
  }

  render() {
    const { config, breakpoints, alt, lazy, ...rest } = this.props;

    if (!config) {
      return null;
    }

    let imgTagBp;
    const breakpointsKeys = Object.keys(breakpoints);

    return (
      <picture
        {...rest}
        key={JSON.stringify(this.props)}
      >
        {breakpointsKeys.map(b => {
          const bpConfig = config.breakpoints[b];
          const bp = breakpoints[b];

          if (!bpConfig) {
            // eslint-disable-next-line no-console
            console.warn(
              `pixboost-react: Can't find breakpoint config for ${b}`
            );
            return;
          }

          if (!imgTagBp) {
            imgTagBp = bp;
          }
          if (!bpConfig.media) {
            imgTagBp = bp;
            return;
          }

          return (
            <source
              key={b}
              media={bpConfig.media}
              srcSet={Picture.bpSrc(config, bp)}
            />
          );
        })}


        <img
          src={Picture.bpSrc(config, imgTagBp)}
          alt={alt}
          {...(lazy && {loading: 'lazy'})}
        />
      </picture>
    );
  }
}

Picture.propTypes = {
  alt: PropTypes.string,
  lazy: PropTypes.bool,
  breakpoints: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

Picture.defaultProps = {
  lazy: true
};

export default Picture;
