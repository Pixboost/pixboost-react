function prepareSource(src) {
  if (typeof window === 'undefined' || !src) {
    return src;
  }

  let encodedSrc = src.indexOf('?') >= 0 ? encodeURIComponent(src) : src;

  if (src.indexOf('//') === 0) {
    return `${window.location.protocol}${encodedSrc}`;
  }

  return encodedSrc;
}

export { prepareSource };
