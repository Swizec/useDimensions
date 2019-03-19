import { useRef, useState, useLayoutEffect } from "react";

function getDimensionObject(ref) {
    const rect = ref.current.getBoundingClientRect();

    if (rect.toJSON) {
        return rect.toJSON();
    } else {
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top || rect.x,
            left: rect.left || rect.left,
            x: rect.x || rect.left,
            y: rect.y || rect.top,
            right: rect.right,
            bottom: rect.bottom
        };
    }
}

function useDimensions() {
    const ref = useRef(); // replacing this with ref callback, also creates infinite loops
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        ref.current && setDimensions(getDimensionObject(ref));
    }, [ref.current]); // removing this creates infinite loops

    return [ref, dimensions];
}

export default useDimensions;
