import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(5),
  price: z.number().min(1),
  description: z.string().min(1),
  stock: z.number(),
});
// .refine(
//   (password, confirmPassword) => password === confirmPassword,
//   "Password is not same"
// );
