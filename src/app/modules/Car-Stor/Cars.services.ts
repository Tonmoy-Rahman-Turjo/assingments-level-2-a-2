import mongoose, { FilterQuery } from 'mongoose';
import { CarsModel } from '../car-modal';
import { Cars } from './Cars.interface';

const CreatCarsDB = async (cars: Cars) => {
  const result = await CarsModel.create(cars);
  return result;
};
//get all cars form db
const GetAllCarsFormDB = async (filter: FilterQuery<Cars>) => {
  const result = await CarsModel.find(filter);
  return result;
};
const GetCarByCategoryDB = async (category: string) => {
  const result = await CarsModel.find({ category: category });
  return result;
};
//// get single car
const getSingleCarById = async (id: string) => {
  
    const result = await CarsModel.findOne({ _id: new mongoose.Types.ObjectId(id),});
    return result;
 
};
//update car
  const updateCarId =  async (id: string, updatedFields: any)=>{
    const result = await CarsModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, updatedFields , { new: true })
    return result
  }

  /// delete car 
  const deletCarID = async(id: string)=>{
     const result = await CarsModel.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
    //  const result = await CarsModel.findOneAndDelete({id})
     return result
  }
export const CarsServices = {
  CreatCarsDB,
  GetAllCarsFormDB,
  GetCarByCategoryDB,
  getSingleCarById,
  updateCarId,
  deletCarID
  
};
