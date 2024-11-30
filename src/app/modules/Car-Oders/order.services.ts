

import { CarsModel } from "../car-modal";
import { OrderModal } from "../order.modal";
import { Order } from "./order.interface";

const createOrder = async (orderData: Order) => {
  
  const car = await CarsModel.findById(orderData.car);

  if (!car) {
    throw new Error("Car not found");
  }

  if (!car.inStock || car.quantity < orderData.quantity) {
    throw new Error("Insufficient stock");
  }

  car.quantity -= orderData.quantity;

  if (car.quantity === 0) {
    car.inStock = false;
  }

  // Save 
  await car.save();

  // Create the order
  const order = new OrderModal(orderData);
  await order.save();

  // Return 
  return order;
};
//// total reveniew calculation

 const TotalRevinew = async()=>{
    const revinew = await OrderModal.aggregate([
          {
            $lookup:{
                from: 'cars',
                localField: 'car',  
                foreignField: '_id',  
                as: 'carDetails',
            }
          },
          {
            $unwind:'$carDetails'
            
          },
          {
            
            $addFields: {
              totalRevenue: { $multiply: ['$carDetails.price', '$quantity'] },
            },
          },
          {
         
            $group: {
              _id: null, 
              totalRevenue: { $sum: '$totalRevenue' },
            },
          },
    ])
    if (!revinew || revinew.length === 0) {
        throw new Error("No revenue data found");
      }
  
      return revinew[0].totalRevenue;
 }
export const OrderServices = {
  createOrder,
  TotalRevinew
};
