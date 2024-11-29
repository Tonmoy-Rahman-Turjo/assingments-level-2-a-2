


 export type Cars ={
    brand: string;
  model: string;
  year: number;
  price: number;
  category: ' Sedan' | 'SuV' |' Truck ' | 'Coupe' | ' Convertible'
  description: string;
  quantity: number;
  inStock: boolean;
  timestamps: {
    createdAt: Date; 
    updatedAt: Date; 
  };
 }