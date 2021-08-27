import { Address } from "./address";

export interface CheckoutDetails {
    userId:      string;
    paymentType: string;
    address:     Address;
}