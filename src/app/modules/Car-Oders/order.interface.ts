import { Types } from "mongoose";


export type Order ={
    _id?: string; 
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}