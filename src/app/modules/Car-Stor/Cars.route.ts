import express from 'express';
import { CarsControlar } from './Cars.controlar';

// import app from "../../../app";

// import { CarsControlar } from "./Cars.controlar";

const router = express.Router();
router.post('/cars-create', CarsControlar.createCars);
// router.get('/category', CarsControlar.GetCategoryCarDB);
router.get('/', CarsControlar.GetAllCars);
router.get('/:carId', CarsControlar.getSingleCar);
router.put('/:carId', CarsControlar.UpdateOneCar);
// app.post('/cars-create', CarsControlar.createCars);

export const carsRoute = router;
