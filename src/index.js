import { useState, useCallback, useLayoutEffect } from "react";

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
    const [node, setNode] = useState(null);

    const ref = useCallback(node => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () => {
                setDimensions(getDimensionObject(node));
            };
            measure();

            window.addEventListener("resize", measure);
            window.addEventListener("scroll", measure);

            return () => {
                window.removeEventListener("resize", measure);
                window.removeEventListener("scroll", measure);
            };
        }
    }, [node]);

    return [ref, dimensions];
}

export default useDimensions;
