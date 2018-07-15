# pixboost-react

[![Build Status](https://travis-ci.org/Pixboost/pixboost-react.svg?branch=master)](https://travis-ci.org/Pixboost/pixboost-react)

Library for integrating pixboost API into the react applications.

Table of Contents:

* [Usage](#usage)
    * [Responsive images](#responsive-images)
    * [Non-responsive images](#non-responsive-images)
    * [Configuration Object](#configuration-object)
* [Browsers Support](#browsers-support)
* [Build](#build)

## Usage

To install the library:

```bash
npm install --save pixboost-react
```

There are two component that's library provides: 
* Image for standard images 
* Picture for responsive images. 

Library supports React version 14+.



### Responsive images

The library provides `Picture` component that will render different size images for different 
visual breakpoints. 

Below is a simple example:

```jsx harmony
    //This is a reusable configuration
    const pixboostConfig = {
        apiKey: 'MTg4MjMxMzM3MA__',
        domain: 'pixboost.com',
        breakpoints: {
            lg: {media: '(min-width: 990px)'},
            md: {media: '(min-width: 640px)'},
            sm: {}
        }
    };

    class YourComponent extends Component {
        render() {
            return (
                <Picture alt={"gadgets"} breakpoints={
                    {
                        lg: {
                            //Will optimise image by default
                            src: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_960_720.jpg'
                        },
                        md: {
                            src: 'https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg',
                            op: 'fit?size=300x300'
                        },
                        sm: {
                            //We can hide image for certain breakpoints
                            hide: true
                        }
                    }
                } config={pixboostConfig}/>
            )
        }
    }
```

Properties (mandatory properties marked with *):

| Property         | Type    | Default  |Description           | 
| -----------------|---------|----------|----------------------|
| breakpoints*     | Object  |          | Object that sets an option for each visual breakpoint. You can use only breakpoints that you specified in the configuration property |
| breakpoints.src* | String  |          | URL of the original image |
| breakpoints.op   | String  | optimise | Operation to perform. By default is optimise. |
| breakpoints.hide | Boolean | false    | If true then will hide image on the breakpoint. |
| config*          | Object  |          | Configuration |
| alt              | String  |          | alt text for an image |
| lazy             | Boolean | true     | If true, then will enable lazy loading for the picture. |

### Non-responsive images

There is an `Image` component that you can use to render a standard image.

Example:

```jsx harmony
    //This is a reusable configuration
    const pixboostConfig = {
        apiKey: 'MTg4MjMxMzM3MA__',
        domain: 'pixboost.com'
    };

    class YourComponent extends Component {
        render() {
            return (
                <Image src={'https://cdn.pixabay.com/photo/2016/05/10/15/29/bear-1383980_960_720.jpg'}
                       alt={'lazy bear'}
                       config={pixboostConfig}
                       op={'resize?size=200'}
                />
            )
        }
    }
```

Properties (mandatory properties marked with *):

| Property         | Type    | Default  |Description           | 
| -----------------|---------|----------|----------------------|
| src*             | String  |          | URL of the original image |
| config*          | Object  |          | Configuration |
| alt              | String  |          | alt text for an image |
| lazy             | Boolean | true     | If true, then will enable lazy loading for the image. |

### Configuration object

| Property          | Type    | Default  |Description           | 
| ------------------|---------|----------|----------------------|
| apiKey*           | String  |          | Pixboost API key |
| domain*           | String  |          | Custom domain name that you setup or pixboost.com |
| breakpoints       | Object  |          | Key-Value pair of breakpoints that you are using for responsive images |
| breakpoints.media | String  |          | Media query for breakpoint |


## Browsers Support

The library supports all major browsers including Chrome, Firefox, Safari and Internet Explorer.
Internet Explorer 9 requires polyfill for `<picture>` implementations. We are recommending to use
[picturefill](http://scottjehl.github.io/picturefill/) version 3. You can include it from our CDN:

```html
    <script src="https://pixboost.com/libs/picturefill.min.js" async></script> 
``` 

Lazy loading is using [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 
feature that supports by all [major browsers](https://caniuse.com/#search=intersectionObserver) 
except Safari. You can use polyfill, but make sure that you are doing thorough testing as we found some problems with absolute
positioned layouts.

## Build

To build from sources:

```bash
npm install
npm run build
```

Result will be generated in the `lib/` folder.