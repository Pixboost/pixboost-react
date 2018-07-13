import React, {Component} from 'react';
import PropTypes from 'prop-types';
import lozad from 'lozad';

class Picture extends Component {
  constructor(props) {
    super(props);
    this.pictureRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.lazy) {
      lozad(this.pictureRef.current).observe();
    }
  }

  static bpSrc(config, bp) {
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
      <picture {...rest} ref={this.pictureRef}>
        {Object.keys(breakpoints).map(b => {
          const bpConfig = config.breakpoints[b];
          const bp = breakpoints[b];

          if (!bpConfig) {
            console.warn(`pixboost-picture: Can't find breakpoint config for ${b}`);
            return;
          }
          if (!bpConfig.media) {
            defaultBp = bp;
            return;
          }

          return (
            <source key={b} media={bpConfig.media} srcset={Picture.bpSrc(config, bp)}/>
          );
        })}
        {defaultBp && !lazy &&
          <img src={Picture.bpSrc(config, defaultBp)} alt={alt}/>
        }
        {defaultBp && lazy &&
          <source srcset={Picture.bpSrc(config, defaultBp)} alt={alt}/>
        }
      </picture>
    )
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