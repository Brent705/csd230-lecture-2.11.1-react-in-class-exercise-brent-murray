import { z } from 'zod';

export const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
});

export const magazineSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    copies: z.coerce.number().int().min(1),
    orderQty: z.coerce.number().int().min(1),
    currentIssue: z.string().min(16, "Invalid date"),
});

export const glovesSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    size: z.string().min(1, "Size is required"),
    price: z.coerce.number().min(0.01),
    weightOz: z.coerce.number().int().min(4, "Min 4oz"),
});

export const shoesSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    size: z.string().min(1, "Size is required"),
    price: z.coerce.number().min(0.01),
    highTop: z.boolean(),
});

export const loginSchema = z.object({
    email: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export const discMagSchema = magazineSchema.extend({
    hasDisc: z.boolean().default(false),
});

export const headgearSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    size: z.string().min(1, "Size is required"),
    price: z.coerce.number().min(0.01),
    type: z.string().min(1, "Type is required"),
});

export const handWrapsSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    size: z.string().min(1, "Size is required"),
    price: z.coerce.number().min(0.01),
    elastic: z.boolean().default(false),
});