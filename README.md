# pixboost-react

![Node.js CI](https://github.com/Pixboost/pixboost-react/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/Pixboost/pixboost-react/branch/main/graph/badge.svg?token=OZHEWxCf5X)](https://codecov.io/gh/Pixboost/pixboost-react)

Library for integrating [Pixboost API](https://help.pixboost.com/api) into the React applications.

Table of Contents:

- [Installation](#installation)
- [Examples](#examples)
- [Responsive images](#responsive-images)
  - [Which one to use?](#which-one-to-use)
  - [HiDpiPicture](#hidpipicture)
  - [Picture](#picture)
- [Non-responsive images](#non-responsive-images)
- [Configuration](#configuration)
- [Browsers Support](#browsers-support)
- [Build](#build)

## Installation

To install the library:

```bash
npm install --save pixboost-react
```

There are 3 components that library provides: 
* `HiDpiPicture` and `Picture` for responsive images.
* `Image` for images that don't need to change size depending on the device.

Library supports React version 14+.

## Examples

You can find examples of how to use components in the [example application](./example/src/App.js).

Example application is also deployed at [http://www.midday.coffee/react-demo/index.html](http://www.midday.coffee/react-demo/index.html)

## Responsive images

There are two types of responsive images components available in the library. Both implementations are using `<picture>`
tag for [high dpi screens optimisation](https://pixboost.com/blog/optimising-images-for-high-dpi-displays/).

* `HiDpiPicture` - Using combination of `srcset` and `sizes` attributes, so browser can pick the most suitable one.
* `Picture` - Displays fixed sizes images on defined media breakpoints

### Which one to use?

`HiDpiPicture` is preferred for large images because any up-scaling artifacts will be more visible to the user on the screens
with DPI > 1. Examples are hero banners, product images, zoom-in images. 

Note that you would also need original images to be in a good quality and at least `3x` of intended viewports size. For instance, if your product image takes up to 1000px
then the original image should be at least 3000px wide.

`Picture` and `Image` are a good choice for small images like thumbnails, icons, etc.

### HiDpiPicture

`HiDpiPicture` is a modern way of implementing responsive images using `srcset` and `sizes` attributes where we provide
browser with variants of the image and visual size constraints to display. The browser then will make hard work for us
and pick the best option to load and display.

Example:

```jsx
    // Reusable configuration
    const pixboostConfig = {
        apiKey: 'MTg4MjMxMzM3MA__',
        domain: 'pixboost.com',
        breakpoints: {
            lg: {media: '(min-width: 990px)'},
            md: {media: '(min-width: 640px)'},
            sm: {}
        }
    };

    function YourComponent() {
      return (
              <HiDpiPicture alt="YO"
                            config={testConfig}
                            breakpoints={{ // operation for each breakpoint width {WIDTH} and {HEIGHT} values replaced with generated width and specified height if any
                              sm: {op: 'fit?size={WIDTH}x{HEIGHT}', height: 600}, // operation and optional fixed height
                              md: {op: 'resize?size={WIDTH}'},
                              lg: {op: 'resize?size={WIDTH}'}
                            }}
                            sizes={{ // image width for each breakpoint
                              sm: '100vw',
                              md: '640px',
                              lg: '1500px'
                            }}
                            minWidth={300}  // minimum visible size of the image
                            maxWidth={3000} // maximum visible size of the image
                            src="//here.com/logo.png"
              />
      )
    }
```

Properties (mandatory properties marked with *):

| Property           | Type     | Default | Description                                                                                                                                                       | 
|--------------------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src*               | String   |         | Source url or path with alias to the source image.                                                                                                                |
| breakpoints*       | Object   |         | Object that sets an option for each visual breakpoint. You can use only breakpoints that you specified in the configuration property                              |
| breakpoints.op*    | String   |         | Operation to perform. By default is `optimise`. You can use {WIDTH} and {HEIGHT} placeholders.                                                                    |
| breakpoints.height | Number   |         | Setting the fixed height for the image on the given breakpoint                                                                                                    |
| sizes*             | Object   |         | Object that specifies width of the image for the particular breakpoint. See [More Info](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes). |
| minWidth*          | Number   |         |                                                                                                                                                                   |
| maxWidth*          | Number   |         |                                                                                                                                                                   |
| config*            | Object   |         | Configuration                                                                                                                                                     |
| alt*               | String   |         | alt text for an image                                                                                                                                             |
| lazy               | Boolean  | false   | If true, then will enable lazy loading for the image.                                                                                                             |
| imgProps           | Object   |         | Pass through props to `<img>` tag.                                                                                                                                |  



### Picture

`Picture` component renders different sizes of the image for different visual breakpoints. 

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

| Property         | Type    | Default  | Description                                                                                                                          | 
|------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------|
| breakpoints*     | Object  |          | Object that sets an option for each visual breakpoint. You can use only breakpoints that you specified in the configuration property |
| breakpoints.src* | String  |          | URL of the original image                                                                                                            |
| breakpoints.op   | String  | optimise | Operation to perform. By default is optimise.                                                                                        |
| breakpoints.hide | Boolean | false    | If true then will hide image on the breakpoint.                                                                                      |
| config*          | Object  |          | Configuration                                                                                                                        |
| alt              | String  |          | alt text for an image                                                                                                                |
| lazy             | Boolean | true     | If true, then will enable lazy loading for the picture.                                                                              |
| imgProps         | Object  |          | Pass through props to `<img>` tag.                                                                                                   |  

## Non-responsive images

An `Image` component will be rendered the same on all screen sizes.

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

| Property | Type    | Default | Description                                           | 
|----------|---------|---------|-------------------------------------------------------|
| src*     | String  |         | URL of the original image                             |
| config*  | Object  |         | Configuration                                         |
| alt      | String  |         | alt text for an image                                 |
| lazy     | Boolean | true    | If true, then will enable lazy loading for the image. |

## Configuration

| Property          | Type   | Default | Description                                                            | 
|-------------------|--------|---------|------------------------------------------------------------------------|
| apiKey*           | String |         | Pixboost API key                                                       |
| domain*           | String |         | Custom domain name that you setup or pixboost.com                      |
| breakpoints       | Object |         | Key-Value pair of breakpoints that you are using for responsive images |
| breakpoints.media | String |         | Media query for the breakpoint                                         |

## Browsers Support

The library supports all major browsers including Chrome, Chromium based (including IE), Firefox, Safari.

## Build

To build from sources:

```bash
npm install
npm run build
```

Result will be generated into the `lib/` folder.