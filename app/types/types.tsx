export type Resource = {
  id?: number;
  machine: string;
  date?: string;
  task: string;
  quantity: number;
  startTime?: string;
  endTime?: string;
  status: "Pending" | "Scheduled";
};

export type Order = {
  id?: number;
  machine: string;
  task: string;
  quantity: number;
  startTime?: string;
  endTime?: string;
  status?: "Pending" | "Scheduled";
};

export type table = {
  id: number;
  machine: "" | "CNC Machine 1" | "Assembly Line A" | "Assembly Line B";
  date?: string;
  task: string;
  quantity: number;
  startTime: string;
  endTime: string;
  status?: "Pending" | "Scheduled";
};