import { Address } from "./address";

export interface User {
    id:       string;
    name:     string;
    phone:    number;
    email:    string;
    password: string;
    role:     string;
    address:  Address;
}