function getBrowser() {
  if (typeof window === 'undefined') {
    return {};
  }

  const ua=window.navigator.userAgent;
  let tem;
  let M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if(/trident/i.test(M[1])){
    tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
    return {name:'IE',version:(tem[1]||'')};
  }
  if(M[1]==='Chrome'){
    tem=ua.match(/\bOPR|Edge\/(\d+)/);
    if(tem!=null)   {return {name:'Opera', version:tem[1]};}
  }
  M=M[2]? [M[1], M[2]]: [window.navigator.appName, window.navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}

function isElementInViewport(el) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function sourceWithProtocol(src) {
  if (typeof window === 'undefined') {
    return src;
  }

  if (src.indexOf('//') === 0) {
    return `${window.location.protocol}${src}`;
  }

  return src;
}

export {getBrowser, isElementInViewport, sourceWithProtocol};