import { Address } from "./address";
import { CartItem } from "./cartItem";

export interface Order {
    id:            string;
    userId:        string;
    totalPrice:    number;
    items:         CartItem[];
    address:       Address;
    orderStatus:   string;
    paymentType:   string;
    transactionId: string;
}
