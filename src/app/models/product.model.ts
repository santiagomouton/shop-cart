export interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
}

export const initialProduct: Product = {
    id: '-1',
    name: 'undefined',
    image: '/assets/image/placeholder-image.png',
    description: 'no description',
    price: -1
}