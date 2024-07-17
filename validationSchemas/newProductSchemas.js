import {z} from "zod";


const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];


export const zProductImages = z.array({
  name: z.string(),
  size: z.number().min(50000).max(5000000),
  type: z.string().refine(type => ACCEPTED_IMAGE_TYPES.includes(type),{message:'invalid file type! must be an image'})
});

export const zProductSizesSchema = z.array({
    name: z.string().min(3),
    colorName: z.string().min(3),
    shortName: z.string().min(1),
    stackQuantity: z.number().min(1)
});


export const zProductColorSchema = z.array({
  colorName: z.string().min(3),
  color: z.string().min(3),
  princeInHalala : z.number().min(100),
});

export const zProductSpeciSchema = z.array({
  name:  z.string().min(3),
  value: z.string().min(3),
});


export const zProductDetailsSchema =  z.object({
  name : z.string().min(3),
  brand: z.string().min(3),
  serialNumber : z.string().min(10).max(10),
  category : z.string().min(3),
  subcategory: z.string().min(3),
  describtion: z.string().min(10),
  colorName: z.string().min(3),
  color: z.string().min(3),
  size: z.string(),
  princeInHalala : z.number().min(100),
});