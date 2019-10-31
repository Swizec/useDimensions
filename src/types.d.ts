export interface DimensionObject {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    right: number;
    bottom: number;
}

export type UseDimensionsHook = [
    (node: HTMLElement) => void,
    {} | DimensionObject,
    HTMLElement
];

export interface UseDimensionsArgs {
    liveMeasure?: boolean;
}

export interface IResizeObserver {
    /**
     * Adds target to the list of observed elements.
     */
    observe: (target: Element) => void

    /**
     * Removes target from the list of observed elements.
     */
    unobserve: (target: Element) => void

    /**
     * Clears both the observationTargets and activeTargets lists.
     */
    disconnect: () => void
    new (callback: ResizeObserverCallback): this
}

/**
 * This callback delivers ResizeObserver's notifications. It is invoked by a
 * broadcast active observations algorithm.
 */
type ResizeObserverCallback = (
    entries: readonly IResizeObserverEntry[],
    observer: IResizeObserver
) => void

interface IResizeObserverEntry {
    /**
     * The Element whose size has changed.
     */
    readonly target: Element

    /**
     * Element's content rect when ResizeObserverCallback is invoked.
     */
    readonly contentRect: DOMRectReadOnly
    /**
     * @param target The Element whose size has changed.
     */
    new (target: Element): this
}

declare global {
    const ResizeObserver: IResizeObserver
}
