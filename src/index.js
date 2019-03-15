import { useRef, useState, useLayoutEffect } from "react";

function useDimensions() {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        ref.current &&
            setDimensions(ref.current.getBoundingClientRect().toJSON());
    }, [ref.current]);

    return [ref, dimensions];
}

export default useDimensions;
