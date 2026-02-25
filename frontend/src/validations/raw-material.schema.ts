import { z } from "zod";

export const rawMaterialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(150, "Name must not exceed 150 characters"),

  quantity: z
    .number({
      error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .min(0, "Quantity must be greater than or equal to 0"),
});

export type RawMaterialFormValues = z.infer<typeof rawMaterialFormSchema>;
