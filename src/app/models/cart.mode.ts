export interface Cart {
    id?: string;
    pending: boolean;
    products: { [index: string]: number };
}