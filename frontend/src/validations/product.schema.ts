import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must not exceed 150 characters"),

  value: z
    .number({
      error: "Value must be a number",
    })
    .min(0.01, "Value must be greater than 0"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
