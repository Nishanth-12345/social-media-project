import { images } from "../constants/image";

export interface ImageData {
    id: number;
    image: string;
    span: "small" | "large";
    colSpan: number;
    rowSpan: number;
}

export const imageData:ImageData[] = [
    {
        id: 1,
        image: images.imageGirl3,
        span: "large",
        rowSpan: 2, colSpan: 4 
    },
    {
        id: 2,
        image: images.imageFlowers3,
        span: "large",
        rowSpan: 2, colSpan: 4
    },
    {
        id: 3,
        image: images.imageMan,
        span: "small",
        rowSpan: 2, colSpan: 5
    },
    {
        id: 4,
        image: images.imageSea,
        span: "small",
        rowSpan: 2, colSpan: 6
    },
    {
        id: 5,
        image: images.imageFlowers2,
        span: "large",
        rowSpan: 2, colSpan: 3
    },
    {
        id: 6,
        image: images.imageGirl2,
        span: "large",
        rowSpan: 3, colSpan: 4
    },
    {
        id: 7,
        image: images.imageGirl1,
        span: "large",
        rowSpan: 2, colSpan: 4
    },
    {
        id: 8,
        image: images.imageFlowers,
        span: "large",
        rowSpan: 2, colSpan: 5
    },
    {
        id: 9,
        image: images.imageFruits,
        span: "small",
        rowSpan: 3, colSpan: 4
    },
]