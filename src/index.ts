import { useState, useCallback, useLayoutEffect } from "react";
import { DimensionObject, UseDimensionsArgs, UseDimensionsHook } from "./types";

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();
    const left = "x" in rect ? rect.x : rect.left;
    const top = "y" in rect ? rect.y : rect.top;
    return {
        width: rect.width,
        height: rect.height,
        x: left,
        y: top,
        top: top,
        left: left,
        right: rect.right,
        bottom: rect.bottom
    };
}

function useDimensions({
    liveMeasure = true
}: UseDimensionsArgs = {}): UseDimensionsHook {
    const [dimensions, setDimensions] = useState({});
    const [node, setNode] = useState(null);

    const ref = useCallback(node => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const measure = () =>
                window.requestAnimationFrame(() =>
                    setDimensions(getDimensionObject(node))
                );
            measure();

            if (liveMeasure) {
                window.addEventListener("resize", measure);
                window.addEventListener("scroll", measure);

                return () => {
                    window.removeEventListener("resize", measure);
                    window.removeEventListener("scroll", measure);
                };
            }
        }
    }, [node]);

    return [ref, dimensions, node];
}

export default useDimensions;
