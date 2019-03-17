import { useRef, useState, useLayoutEffect } from "react";

function useDimensions() {
    const ref = useRef(); // replacing this with ref callback, also creates infinite loops
    const [dimensions, setDimensions] = useState({});
    useLayoutEffect(() => {
        ref.current &&
            setDimensions(ref.current.getBoundingClientRect().toJSON());
    }, [ref.current]); // removing this creates infinite loops

    return [ref, dimensions];
}

export default useDimensions;
