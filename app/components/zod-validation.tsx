import { z } from "zod";

export const ZodSchema = z.object({
  date: z.string(),
  machine: z.enum(["CNC Machine 1", "Assembly Line A", "Assembly Line B"]),
  task: z.string().min(3, "Name must be at least 3 characters"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  startTime: z.string(),
  endTime: z.string(),
})
.refine((data) => data.startTime < data.endTime, {
  message: "End time must be later than start time",
  path: ["endTime"],
})
// 2. Asynchronous Database check for collision 
.superRefine(async (data, ctx) => {
  try {
    const response = await fetch("https://production-scheduler-backend-server.onrender.com/check-collision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: data.date,
        machine: data.machine,
        startTime: data.startTime,
        endTime: data.endTime,
      }),
    });

    const result = await response.json();

    // If the backend says the slot is taken or has not elapsed
    if (result.conflict === true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "This time slot overlaps with an existing active order",
        path: ["startTime"], // Highlight the field causing the issue
      });
    }
  } catch (error) {
    // Optional: handle API failure
    console.error("API Validation fetch failed", error);
  }
});

export type Order = z.infer<typeof ZodSchema>;

*/
