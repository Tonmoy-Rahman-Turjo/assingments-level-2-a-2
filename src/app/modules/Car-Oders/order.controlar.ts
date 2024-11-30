

import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { CarsModel } from "../car-modal";
import mongoose from "mongoose";

  
  const placeOrder = async (req: Request, res: Response) => {
    try {
       
      const { email, car, quantity, totalPrice } = req.body;
      if (!mongoose.Types.ObjectId.isValid(car)) {
       res.status(400).json({
          message: 'Invalid car ID format',
          status: false,
        });
      }
      const carRecord = await CarsModel.findById(car);
    if (!carRecord) {
       res.status(400).json({
        message: 'Invalid car ID',
        status: false,
        error: `No car found with ID: ${car}`,
        path: `/orders/${car}`,
        providedCarId: car,
        stack: new Error().stack,
      });
    }
      const orderData = { email, car, quantity, totalPrice };
      const newOrder = await OrderServices.createOrder(orderData);
      
      res.status(201).json({
        message: 'Order created successfully',
        status: true,
        data: newOrder,
      });
    } catch (error) {
      console.log('Error details:', error); 
  
      if (error instanceof Error) {
    
          res.status(400).json({
            message: 'Insufficient stock',
            status: false,
          });
        
      } 
    }
  };
/// calculet rivew

const calculateRevenueDB = async (req: Request, res:Response)=>{
    try{
        const totalRevenue = await OrderServices.TotalRevinew()
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue
            },
          });
    }


    catch(error){
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Internal server error',
            error: ' error ',
            stack: new Error().stack,
          });
    }
}
export const OrderController = {
  placeOrder,
  calculateRevenueDB
};

