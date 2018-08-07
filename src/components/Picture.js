import React, {Component} from 'react';
import PropTypes from 'prop-types';
import lozad from '../lozad';
import {getBrowser, isElementInViewport} from '../util';

const browser = getBrowser();

const IE9Wrapper = (props) => {
  const isIE9 = browser.name === 'MSIE' && browser.version === '9';

  if (isIE9) {
    return <video style={{display: 'none'}}>
      {props.children}
    </video>;
  }

  return props.children;
};

class Picture extends Component {
  constructor(props) {
    super(props);
    this.pictureRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.lazy) {
      const el = this.pictureRef.current;
      const lozadInstance = lozad(el, {
        threshold: 0.01,
        rootMargin: '40px 0px 0px 0px',
        loaded: () => {
          if (window.picturefill && typeof window.picturefill === 'function') {
            window.picturefill();
          }
        }
      });

      if (isElementInViewport(el)) {
        lozadInstance.triggerLoad(el);
        if (window.picturefill && typeof window.picturefill === 'function') {
          window.picturefill();
        }
      } else {
        lozadInstance.observe();
      }
    }
  }

  static bpSrc(config, bp) {
    if (bp.src && bp.src.indexOf('data:') === 0) {
      return bp.src;
    }
    if (bp.hide) {
      return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    }
    const op = bp.op || 'optimise';

    return `${config.domain.includes('//') ? '' : '//'}${config.domain}/api/2/img/${bp.src}/${op}${op.includes('?') ? '&' : '?'}auth=${config.apiKey}`;
  }

  render() {
    const {config, breakpoints, alt, lazy, ...rest} = this.props;
    let defaultBp;
    return (
      <picture {...rest} data-alt={alt} ref={this.pictureRef}>
        <IE9Wrapper>
          {Object.keys(breakpoints).map(b => {
            const bpConfig = config.breakpoints[b];
            const bp = breakpoints[b];

            if (!bpConfig) {
            // eslint-disable-next-line no-console
              console.warn(`pixboost-react: Can't find breakpoint config for ${b}`);
              return;
            }
            if (!bpConfig.media) {
              defaultBp = bp;
              return;
            }

            return (
              <source key={b} media={bpConfig.media} srcSet={Picture.bpSrc(config, bp)}/>
            );
          })}
        </IE9Wrapper>
        {defaultBp && !lazy &&
          <img src={Picture.bpSrc(config, defaultBp)} alt={alt}/>
        }
        {defaultBp && lazy &&
          <source srcSet={Picture.bpSrc(config, defaultBp)}/>
        }
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