import { CartItem } from "./cartItem";

export interface Cart {
    id:         string;
    userId:     string;
    totalPrice: number;
    items:      CartItem[];
}