"use client";
import { z } from "zod";
import React, { useState } from "react";
import { useStore } from "../store";
import { ZodSchema } from "./zod-validation";

export default function Form() {
    const resources = useStore((state) => state.resources);
    const addOrder = useStore((state) => state.addOrder);

    //state for forms
    const [machine, setMachine] = useState("");
    const [task, setTask] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");

    //error message
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
   
        //form object for parsing data
        const formdata = { machine, task, quantity, startTime, endTime};

        const parsed = ZodSchema.safeParse(formdata);

        if (!parsed.success) {
            setError(parsed.error.message);
            alert("unsuccessful");
            console.log(error);
            return;
        } else {
            alert("successful");
            setError("successful")
            console.log("successful");
            console.log(formdata);
        }

        //send the order information to zustand store
        addOrder(parsed.data);
        setError(null);

        //clear the form
        setMachine("");
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