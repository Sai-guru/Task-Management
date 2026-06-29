import { z } from "zod";
//validation for the data task.
export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  status: z
    .enum(["Pending", "In Progress"])
    .optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;