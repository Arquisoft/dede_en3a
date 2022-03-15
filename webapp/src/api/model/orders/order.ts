import {OrderInd} from "./orderInd";

export interface Order{
    address: string;
    created: number;
    items : OrderInd[];
    totalAmount : number;
    userEmail : string;
}