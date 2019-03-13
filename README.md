# useDimensions - a React Hook to measure DOM nodes

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

The other day I wanted to measure some DOM nodes. This is useful when you have to align items, or respond to browser width, or ... lots of reasons okay.

I had to align a curvy line with elements that aren't under my control. This little stepper component uses flexbox to evenly space circles, CSS layouting aligns the title, and you see where this is going.

[![](https://s3.amazonaws.com/techletter.app/screenshot-1552494217818.png)](https://twitter.com/Swizec/status/1105494223011241984)

SVG in the background detects position of itself, positions of the title and circle, and uses those to define the `start` and `end` line of my curve. 👌

Many ways you can do this.

@lavrton linked to [a list of existing NPM packages](https://www.npmjs.com/search?q=hook%20size) that sort of do it. @mcalus shared how [he uses `react-sizeme`](https://github.com/mcalus3/open-fraksl/blob/master/src/components/DomainComponents/DrawingComponents/FractalStage.tsx) to get it done.

All great, but I wanted something even simpler. I also didn't know about them and kind of just wanted to make my own.

Here's an approach I found works great

## useDimensions hook

![useDimensions source](https://i.imgur.com/Tm1Bmdw.png)

Yep that's it. It really is that simple.

👉 [GitHub link](https://github.com/Swizec/useDimensions)

-   `useRef` creates a React.ref, lets you access the DOM
-   `useState` gives you place to store/read the result
-   `useLayoutEffect` runs before browser paint but after all is known
-   `getClientBoundingRect()` measures a DOM node. Width, height, x, y, etc
-   `toJSON` turns a DOMRect object into a plain object so you can destructure

Here's how to use it in your project 👇

First, add `useDimensions` to your project

```
$ yarn add react-use-dimensions
or
$ npm install --save react-use-dimensions
```

Using it in a component looks like this

```javascript
import React from "react";
import useDimensions from "react-use-dimensions";

const MyComponent = () => {
    const [ref, { x, y, width }] = useDimensions();

    return <div ref={ref}>This is the element you'll measure</div>;
};
```

`useDimensions` returns a 2-element array. First the `ref`, second the dimensions.

This is so multiple `useDimensions` hooks in the same component don't step on each others' toes. Create as many refs and measurement objects as you'd like.

```javascript
const MyComponent = () => {
    const [stepRef, stepSize] = useDimensions();
    const [titleRef, titleSize] = useDimensions();

    console.log("Step is at X: ", stepSize.x);
    console.log("Title is", titleSize.width, "wide");

    return (
        <div>
            <div ref={stepRef}>This is a step</div>
            <h1 ref={titleRef}>The title</h1>
        </div>
    );
};
```

MIT License of course.
