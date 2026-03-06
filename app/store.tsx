import { create } from "zustand";
import { Resource } from "./types/types";
import { Order } from "./components/zod-validation";

type Store = {
  resources: Resource[];
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
};

export const useStore = create<Store>((set) => ({
  resources: [
    { id: 1, machine: "", date:"", task:"", quantity: 0, startTime:"", endTime:"", status: "Pending" },
    { id: 1, machine: "CNC Machine 1", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" },
    { id: 2, machine: "Assembly Line A", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" },
    { id: 3, machine: "Assembly Line B", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" }
  ],
  orders: [], //formdata: [],
  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  updateOrder: (order) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.machine === order.machine ? order : o)),
    })),
}));
