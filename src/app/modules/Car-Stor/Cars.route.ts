
import  express  from "express";
import { CarsControlar } from "./Cars.controlar";

// import app from "../../../app";

// import { CarsControlar } from "./Cars.controlar";
 
const router = express.Router()
router.post('/cars-create', CarsControlar.createCars);

// app.post('/cars-create', CarsControlar.createCars);

 export const carsRoute = router