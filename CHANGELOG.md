# Changelog

2.2.0
* New HiDpiPicture component.

2.1.0
* Added `imgProps` for the Picture component. 

2.0.0
* Using native lazy loading instead of Intersection Observer JS API.
* Removed lozadOptions from the configuration object.
* Removed polyfills and support for IE.

1.6.0
* Added `lozadOptions` to the config, so users can override intersection observer configuration and other [lozad](https://github.com/ApoorvSaxena/lozad.js) properties.

1.5.1
* FIX: Picture doesn't render image tag when lazy loading turned off and there is not empty breakpoint in the config.

1.4.7
* FIX: Updating source on Picture component in IE 11 is not working.