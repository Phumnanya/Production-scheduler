"use client";
import { useState, useEffect } from "react";
import { table } from "../types/types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function Logic() {
    const url = "http://127.0.0.1:5000/orders"
    //fetch list of orders from the db when page loads
        useEffect(() => {
          const fetchOrders = async () => {
            try {
                const response = await fetch(url);
                const data: table[] = await response.json();
                const lineAdata = data.filter((item) => item.machine === 'Assembly Line A')
                    const chartData = lineAdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity,
                        // Keeping the original ID just in case you need it for keys
                        id: item.id 
                        }))
                } catch (err) {
                    console.error(err);
                }
          };
        
          fetchOrders();
        }, []);   
        return(
            <div>let quantity = [];
                    let startTime = [];
                    let endTime = [];
            </div>
        )
}


 /*
 (data as table[]).forEach((item) => {
                    //console.log("looping items", item);
 if(item.machine === "Assembly Line A") {
                        var lineA= [];
                        console.log("yes assembly line dey");
                        });
                    }*/