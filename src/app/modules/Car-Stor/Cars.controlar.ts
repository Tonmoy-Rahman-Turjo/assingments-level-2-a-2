import { Request, Response } from "express";
import { CarsServices } from "./Cars.services";

import carSchemaValidation from "./car.validation";

const createCars = async (req: Request, res: Response) => {
    try {
      ////creating a schema validation joi
      
      const {cars: CarsData} = req.body;
   
      const{error, value} = carSchemaValidation.validate(CarsData)

      if (error) {
        // erro handeling
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: error.details.map((detail) => ({
            message: detail.message,
            path: detail.path
          })),
          stack: error.stack 
        });
      }

            //create-cars
      const result = await CarsServices.CreatCarsDB(value);
      if(error){
        res.status(200).json({
          success: true,
          message: 'Something was rong',
          error,
          stack: new Error().stack
        });
      }
      
      //response
      res.status(200).json({
        success: true,
        message: 'Student Creat Successfuly',
        data: result,
      });
 
  
      
    }catch (err) {
        res.status(500).json({
            success: false,
            message: 'somting rong',
            error: err,
            stack: new Error().stack
          });
      }
  };







export const CarsControlar = {
    createCars
}


