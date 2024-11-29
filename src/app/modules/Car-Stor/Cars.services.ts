
import { CarsModel } from "../car-modal";
import { Cars } from "./Cars.interface";


const CreatCarsDB = async (cars: Cars) =>{
    const result = await CarsModel.create(cars)
    return result
}

export const CarsServices ={
    CreatCarsDB
}