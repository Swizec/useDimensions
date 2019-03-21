import React, { Component, useState } from "react";
import "./App.css";
import useDimensions from "../../src/index";

const MeasuredNode = () => {
    const [ref, { x, y, width, height }] = useDimensions();

    return (
        <p ref={ref}>
            I am a paragraph at ({x}px, {y}px) position with a width of {width}
            px and height of {height}px
        </p>
    );
};

const MyComponent = () => {
    const [ref, { width }] = useDimensions();
    return (
        <Parent childRef={ref}>
            <p>Hello is {width}px wide</p>
        </Parent>
    );
};

const Parent = ({ childRef, children }) => {
    const [showChild, setShowChild] = useState(false);
    return (
        <React.Fragment>
            {showChild ? <div ref={childRef}>Hello</div> : null}
            <button onClick={() => setShowChild(!showChild)}>
                Toggle Hello
            </button>
            {children}
        </React.Fragment>
    );
};

class App extends Component {
    render() {
        return (
            <div className="App App-header">
                <h1>useDimensions demo</h1>
                <p>
                    <a href="https://github.com/Swizec/useDimensions">
                        useDimensions
                    </a>{" "}
                    is a React Hook for measuring DOM nodes. You can use it to
                    measure any element in your DOM. Try resizing this window to
                    watch useDimensions update measurements live. Like this 👇
                </p>
                <code>
                    <pre>{`
import React from 'react'
import useDimensions from 'react-use-dimensions'

const MeasuredNode = () => {
    const [ref, { x, y, width, height }] = useDimensions();

    return (
        <p ref={ref}>
            I am a paragraph at ({x}px, {y}px) position with a width of {width}px
            and height of {height}px
        </p>
    );
};
`}</pre>
                </code>
                <p>👇</p>
                <MeasuredNode />
                <h2>Works with deep nested components</h2>
                <MyComponent />
                <p>👆</p>
                <code>
                    <pre>{`
const MyComponent = () => {
    const [ref, { width }] = useDimensions();
    return (
        <Parent childRef={ref}>
            <p>Hello is {width}px wide</p>
        </Parent>
    );
};

const Parent = ({ childRef, children }) => {
    const [showChild, setShowChild] = useState(false);
    return (
        <React.Fragment>
            {showChild ? <div ref={childRef}>Hello</div> : null}
            <button onClick={() => setShowChild(!showChild)}>
                Toggle Hello
            </button>
            {children}
        </React.Fragment>
    );
};
                `}</pre>
                </code>
            </div>
        );
    }
}

export default App;
