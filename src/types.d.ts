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
    boundsType?: BoundsType;
}

export enum BoundsType {
    client = 'CLIENT',
    offset = 'OFFSET',
    scroll = 'SCROLL',
    bbox = 'BBOX'
}
