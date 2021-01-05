import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lozad from '../lozad';
import { getBrowser, prepareSource } from '../util';

const browser = getBrowser();
const defaultLozadOptions = Object.freeze(
  {
    threshold: 0.01,
    rootMargin: '40px 0px 0px 0px'
  }
)

const IE9Wrapper = props => {
  const isIE9 = browser.name === 'MSIE' && browser.version === '9';

  if (isIE9) {
    return <video style={{ display: 'none' }}>{props.children}</video>;
  }

  return props.children;
};

class Picture extends Component {
  constructor(props) {
    super(props);
    this.pictureRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setupLazyLoad();
    }
  }

  componentDidMount() {
    this.setupLazyLoad();
  }

  setupLazyLoad() {
    if (!this.pictureRef.current) {
      return;
    }

    if (this.props.lazy) {
      const el = this.pictureRef.current;
      const lozadInstance = lozad(el, Object.assign(
        {},
        defaultLozadOptions,
        this.props.config.lozadOptions,
        {
          loaded: (el) => {
            if (window.picturefill && typeof window.picturefill === 'function') {
              window.picturefill();
            }
            if (this.props.config.lozadOptions && this.props.config.lozadOptions.loaded) {
              this.props.config.lozadOptions.loaded(el)
            }
          }
        }));

      lozadInstance.observe();
    }
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

    let emptyBp;
    const breakpointsKeys = Object.keys(breakpoints);

    return (
      <picture
        {...rest}
        data-alt={alt}
        ref={this.pictureRef}
        key={JSON.stringify(this.props)}
      >
        <IE9Wrapper>
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
            if (!bpConfig.media) {
              emptyBp = bp;
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
        </IE9Wrapper>
        {emptyBp && !lazy && (
          <img src={Picture.bpSrc(config, emptyBp)} alt={alt} />
        )}
        {!emptyBp && !lazy && breakpointsKeys.length > 0 && (
          <img src={Picture.bpSrc(config, breakpoints[breakpointsKeys[0]])} alt={alt} />
        )}
        {emptyBp && lazy && (
          <source srcSet={Picture.bpSrc(config, emptyBp)} />
        )}
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
