import { Address } from "./address";

export interface User {
    name:     string;
    phone:    number;
    email:    string;
    password: string;
    role:     string;
    address:  Address;
}