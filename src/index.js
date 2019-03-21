import { useState, useCallback } from "react";

function getDimensionObject(node) {
    const rect = node.getBoundingClientRect();

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
    const [dimensions, setDimensions] = useState({});

    const ref = useCallback(node => {
        if (node) {
            setDimensions(getDimensionObject(node));
        } else {
            setDimensions({});
        }
    }, []);

    return [ref, dimensions];
}

export default useDimensions;
