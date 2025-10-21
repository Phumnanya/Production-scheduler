import { z } from "zod";

export const ZodSchema = z.object({
  //id: z.number().int(),
  machine: z.enum(["CNC Machine 1", "Assembly Line A", "Assembly Line B"]),
  task: z.string().min(3, "Name must be at least 3 characters"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  startTime: z.string(),
  endTime: z.string(),
})
.refine(
  (data) => {
    // Compare times (in "HH:MM" format)
    const start = data.startTime;
    const end = data.endTime;
    return start < end; // string comparison works fine for 24-hour times
  },
  {
    message: "End time must be later than start time",
    path: ["endTime"], // attaches the error to the 'endTime' field
  }
);

export type Order = z.infer<typeof ZodSchema>;
