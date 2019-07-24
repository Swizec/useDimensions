import { useState, useCallback, useLayoutEffect } from "react";
import {DimensionObject, UseDimensionsArgs, UseDimensionsHook, BoundsType} from './types';

function getDimensionObject(node: Element, boundsType: BoundsType): DimensionObject {
    let rect;
    switch(boundsType) {
        case BoundsType.bbox:
            // getBBox() only exists on SVGGraphicsElements
            if (!(node instanceof SVGGraphicsElement))
                throw new Error();
            rect = node.getBBox();
            return {
                width: rect.width,
                height: rect.height,
                left: rect.x,
                top: rect.y,
                x: rect.x,
                y: rect.y,
                right: rect.right,
                bottom: rect.bottom
            };
        case BoundsType.client:
            rect = node.getBoundingClientRect();
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
        case BoundsType.offset:
            // The offset* properties only exist on HTMLElements
            if (!(node instanceof HTMLElement))
                throw new Error();
            return {
                width: node.offsetWidth,
                height: node.offsetHeight,
                top: node.offsetTop,
                left: node.offsetLeft,
                x: node.offsetLeft,
                y: node.offsetTop,
                right: null,
                bottom: null,
            };
        case BoundsType.scroll:
            return {
                width: node.scrollWidth,
                height: node.scrollHeight,
                top: node.scrollTop,
                left: node.scrollLeft,
                x: node.scrollLeft,
                y: node.scrollTop,
                right: null,
                bottom: null,
            };
    }
}

function useDimensions({
    liveMeasure = true,
    boundsType = BoundsType.client
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
                    setDimensions(getDimensionObject(node, boundsType))
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
