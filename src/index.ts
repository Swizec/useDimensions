import { useState, useCallback, useLayoutEffect } from "react";
import { DimensionObject, UseDimensionsArgs, UseDimensionsHook } from "./types";

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        top: "x" in rect ? rect.x : rect.top,
        left: "y" in rect ? rect.y : rect.left,
        x: "x" in rect ? rect.x : rect.left,
        y: "y" in rect ? rect.y : rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
}

function useDimensions({
    liveMeasure = true,
    trackScrolling = true
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
            }
            if (trackScrolling) {
                window.addEventListener("scroll", measure);
            }

            return () => {
                if (liveMeasure) {
                    window.removeEventListener("resize", measure);
                }
                if (trackScrolling) {
                    window.removeEventListener("scroll", measure);
                }
            };
        }
    }, [node]);

    return [ref, dimensions, node];
}

export default useDimensions;
