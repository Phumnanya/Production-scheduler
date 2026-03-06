"use client";
import React, { useState } from "react";
import { useStore } from "../store";
import { ZodSchema } from "./zod-validation";

export default function Form() {
    const resources = useStore((state) => state.resources);
    const addOrder = useStore((state) => state.addOrder);

    //state for form
    const [machine, setMachine] = useState("");
    const [date,setDate] = useState("");
    const [task, setTask] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [error, setError] = useState<string | null>(null);

//submit form
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const formdata = { machine, date, task, quantity, startTime, endTime};
        const parsed = ZodSchema.safeParse(formdata);

        if (!parsed.success) {
        setError(parsed.error.message);
        alert("unsuccessful process");
        console.log(error);
        return;
    } else {
        alert("successful");
        setError("successful")
        console.log("successful");
        console.log(formdata);
    }
        await fetch("http://127.0.0.1:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        }
    );
        //clear the form
        setError(null);
        setMachine("");
        setDate("");
        setTask("");
        setQuantity("");
        setstartTime("");
        setendTime("");
        console.log(ZodSchema.safeParse({}));
    };
    
    return(
        <>
        <p className="text-red-700">I am ready to take charge of my future!!</p>
        <div className="p-10 max-w-3/5 h-fit shadow-2xl bg-amber-200 mx-auto">
        <form onSubmit={handleSubmit}>
            <label htmlFor="resource">Machine</label><br />
            <select id="resource" name="resource" className="w-full bg-white
            border-black border-solid p-3"
            onChange={(e) => setMachine(e.target.value)} 
            value={machine} >
                {resources.map((resource) => (
                <option value={resource.machine} key={resource.id}>{resource.machine}</option>
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
            <input type="time" value={startTime} className="w-full bg-white
            border-black border-solid p-3" name="startTime"
            onChange={(e) => setstartTime(e.target.value)} />
            <br /><br />
            <label htmlFor="etime">End Time</label><br />
            <input type="time" value={endTime} className="w-full bg-white
            border-black border-solid p-3" name="endtime"
            onChange={(e) => setendTime(e.target.value)} />
            <br /><br />

            <button type="submit" className="w-fit bg-lime-500 m-auto p-3 text-white 
            cursor-pointer" value="Order">Order</button>
             {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        </div>
        </>
    );
}

