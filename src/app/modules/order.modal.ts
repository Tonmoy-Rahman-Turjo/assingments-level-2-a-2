
import { model, Schema} from "mongoose";
import { Order } from "./Car-Oders/order.interface";


 const OrderSchema = new Schema<Order>(
    {
        email: {
          type: String,
          required: true,
          trim: true,
        },
        car: {
            type: Schema.Types.ObjectId, 
            ref: 'Cars',                  
            required: true,
          },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'], 
        },
        totalPrice: {
          type: Number,
          required: true,
          min: [0, 'Total price must be a positive number'], 
        },
      },
      {
        timestamps: true, 
      }

 )
 export const OrderModal  = model<Order>('Orders', OrderSchema)