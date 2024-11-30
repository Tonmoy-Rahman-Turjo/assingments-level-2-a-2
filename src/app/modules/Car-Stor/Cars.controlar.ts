import { Request, Response } from 'express';
import { CarsServices} from './Cars.services';

import carSchemaValidation from './car.validation';
import mongoose from 'mongoose';

const createCars = async (req: Request, res: Response) => {
  try {
    ////creating a schema validation joi

    const { cars: CarsData } = req.body;

    const { error, value } = carSchemaValidation.validate(CarsData);

    if (error) {
      // erro handeling
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
        stack: error.stack,
      });
    }

    //create-cars
    const result = await CarsServices.CreatCarsDB(value);
    if (error) {
      res.status(200).json({
        success: true,
        message: 'Something was rong',
        error,
        stack: new Error().stack,
      });
    }

    //response
    res.status(200).json({
      success: true,
      message: 'Student Creat Successfuly',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'somting rong',
      error: err,
      stack: new Error().stack,
    });
  }
};

//  get all cars and apply queary selector
const GetAllCars = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let filter = {};

    if (searchTerm) {
      filter = {
        $or: [
          { brand: { $regex: searchTerm.toString(), $options: 'i' } },
          { model: { $regex: searchTerm.toString(), $options: 'i' } },
          { category: { $regex: searchTerm.toString(), $options: 'i' } },
        ],
      };
    }

    const result = await CarsServices.GetAllCarsFormDB(filter);

    if (result.length === 0) {
      return res.status(404).json({
        message: ' cars not found matching the search term',
        success: false,
        error: {
          name: 'No Matching Cars ',
          message:
            ' your search Item not match plase select valid search  item.',
          searchTerm: searchTerm,
        },
        stack: new Error().stack,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      message: 'Internal server error',
      error: 'eroor',
      stack: new Error().stack,
    });
  }
};
//// get single car
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const trimmedCarId = carId.trim();

    if (!trimmedCarId.match(/^[a-zA-Z0-9]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid car ID = please provide valid Cars Id',
        error: 'The car ID provided is not valid.',
        path: `/cars/${carId}`,
        providedCarId: carId,
        stack: new Error().stack,
      });
    }

    const result = await CarsServices.getSingleCarById(trimmedCarId);

    // Respond
    res.status(200).json({
      success: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: 'Internal server error',
      error: ' error ',
      stack: new Error().stack,
    });
  }
};
///update Cars 
const UpdateOneCar = async (req: Request, res:Response)=>{
  try{
    const { carId } = req.params;  
    const updatedFields = req.body;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid car ID',
        error: `The provided car ID (${carId}) is not a valid MongoDB ObjectId`,
        stack: new Error().stack, 
      });
    }
    const updatedCar = await CarsServices.updateCarId(carId, updatedFields);
     res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: updatedCar,  
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
 /// deleted
  const deletedCarsIdDB = async (req: Request, res:Response)=>{
    try{
      const {carId} = req.params;
    
    if (!carId || carId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required',
        error: 'Invalid or missing Car ID',
      });
    }
     const result =  await CarsServices.deletCarID(carId)
     if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Car not found',
        error: `No car found with ID: ${carId}`,
        path: `/cars/${carId}`,
        providedCarId: carId,
        stack: new Error().stack,
      });
    }
     res.status(200).json({
      success: true,
      message: 'Car deletd successfully',
      data: {}, 
    });
    }

    catch(error){
      console.log(error)
    }
  }
export const CarsControlar = {
  createCars,
  GetAllCars,
  getSingleCar,
  UpdateOneCar,
  deletedCarsIdDB
};
