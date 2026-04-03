"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Resource } from "../types/types";
import { ZodSchema } from "./zod-validation";
import Image from "next/image";

export default function RegisterOrder() {

//state for form
    const [machine, setMachine] = useState("");
    const [date,setDate] = useState("");
    const [task, setTask] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [EndTimerrors, setEndTimErrors] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [data,setData] = useState("");
    const router = useRouter();

//decoy data fetching to enable page loading spinner
    useEffect(() => {
    const fetchInitialData = async () => {
        try {
            const response = await fetch("https://production-scheduler-backend-server.onrender.com/orders", { cache: "force-cache" });
            const result = await response.json();
            setData(result); 
        } catch (error) {
            console.error("Failed to load initial data", error);
        } finally {
            // This runs whether the fetch succeeded or failed
            setIsLoading(false); 
        }
    };

    fetchInitialData();
}, []);

//machines for the form
    const machines: Resource[] =
       [
        { id: 0, machine: " ", date:"", task:"", quantity: 0, startTime:"", endTime:"", status: "Pending" },
        { id: 1, machine: "CNC Machine 1", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" },
        { id: 2, machine: "Assembly Line A", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" },
        { id: 3, machine: "Assembly Line B", date:"", task:"", quantity: 0, startTime:"9:00", endTime:"9:05", status: "Pending" }
      ]

//submit form
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrors({});
        setEndTimErrors({});
        //setIsLoading(false);
        const formdata = { machine, date, task, quantity, startTime, endTime};
        const parsed = await ZodSchema.safeParseAsync(formdata);

        if (!parsed.success) {
            setErrors(parsed.error.flatten().fieldErrors);
            setEndTimErrors(parsed.error.flatten().fieldErrors);
            return;
        } else {
            alert("order has been scheduled successfully!!");
        }
        const response = await fetch("https://production-scheduler-backend-server.onrender.com/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
            }
        );
        if (response.ok) {
            router.push('/dashboard');
        }
    };
    if (isLoading) {
        return(
            <div className="fixed inset-0 bg-white flex flex-col justify-center 
            items-center z-50">
                <img src='/icons8-loading.gif' alt="Loading..." />
                <p className="mt-4 text-black font-semibold">Loading Scheduler...</p>
            </div>
        )
    }
    
    return(
        <div className="md:p-10 p-4 md:w-3/5 w-full h-fit shadow-2xl bg-amber-200 md:mx-auto">
        <form onSubmit={handleSubmit}>
            <label htmlFor="resource">Machine</label><br />
            <select id="resource" name="resource" className="w-full bg-white
            border-black border-solid p-3"
            onChange={(e) => setMachine(e.target.value)} 
            value={machine} >
                {machines.map((machine) => (
                <option key={machine.machine} value={machine.machine}>{machine.machine}</option>
                ))}
            </select>
            <br /><br />
            <label htmlFor="task">Task</label><br />
            <input type="text" value={task} className="w-full bg-white
            border-black border-solid p-3" 
            onChange={(e) => setTask(e.target.value)}/>
            <br /><br />
            <label htmlFor="quantity">Quantity</label><br />
            <input type="number" value={quantity} className="w-full bg-white
            border-black border-solid p-3"
            onChange={(e) => setQuantity(e.target.value)} />
            <br /><br />
            <label htmlFor="Date">Date</label><br />
            <input type="date" value={date} className="w-full bg-white
            border-black border-solid p-3"
            onChange={(e) => setDate(e.target.value)} />
            <br /><br />
            <label htmlFor="stime">Start Time</label><br />
            <input type="time" value={startTime} name="startTime"
            onChange={(e) => setstartTime(e.target.value)}
            className={`w-full bg-white border-solid p-3 border ${
                errors.startTime ? "border-red-500" : "border-black"
            }`} />
            {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">
                {errors.startTime[0]} {/* This shows "This time slot overlaps..." */}
                </p>
            )}
            <br /><br />
            <label htmlFor="etime">End Time</label><br />
            <input type="time" value={endTime} className={`w-full bg-white
            border-black border-solid p-3 ${
                errors.endTime ? "border-red-500" : "border-black"
            }`} name="endtime"
            onChange={(e) => setendTime(e.target.value)} />
            {errors.endTime && (
                <p className="text-red-500 text-sm mt-1">
                {errors.endTime[0]} {/* This shows "End time must be later than start time" */}
                </p>
            )}
            <br /><br />

            <button type="submit" className="w-fit bg-lime-500 m-auto px-7 py-2 text-white 
            cursor-pointer" value="Order">Order</button>
        </form>
        </div>
    );
}

