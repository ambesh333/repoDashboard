import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  dateR: z.string().optional(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
