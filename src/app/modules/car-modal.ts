// import { Schema, model } from 'mongoose';
// import { Cars } from './Car-Stor/Cars.interface';

// const CarSchema = new Schema<Cars>({
//   brand: {
//     type: String, required: true, trim: true
//   },
//   model: {
//     type: String, required: true, trim: true
//   },
//   year: {
//     type: Number, required: true, trim: true
//   },
//   price: {
//     type: Number, required: true, trim: true
//   },
//   category: {
//     type: String,
//     enum: {
//       values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
//       message: 'Please select a valid category.'
//     },
//     required: true
//   },
//   description: {
//     type: String, required: true, trim: true
//   },
//   quantity: {
//     type: Number, required: true, trim: true
//   },
//   inStock: {
//     type: Boolean
//   },
//   { timestamps: true, }

// });

// export const CarsModel = model<Cars>('Cars', CarSchema);
import { Schema, model } from 'mongoose';
import { Cars } from './Car-Stor/Cars.interface';

const CarSchema = new Schema<Cars>(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Ford'],

        message: 'Please select a valid Brand.',
      },
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message: 'Please select a valid category.',
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CarsModel = model<Cars>('Cars', CarSchema);
