import { useRef, useState, useLayoutEffect } from "react";

function useDimensions(ref = useRef()) {
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        setDimensions(ref.current.getBoundingClientRect().toJSON());
    }, [ref.current]);

    return [ref, dimensions];
}

export default useDimensions;
