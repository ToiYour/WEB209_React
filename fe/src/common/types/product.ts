export interface IProduct {
    _id?: string;
    name: string;
    category?: string;
    price: number;
    quantity?: number;
    image: string;
    description: string;
    discount?: number;
    featured?: boolean;
    countInStock?: number;
}
