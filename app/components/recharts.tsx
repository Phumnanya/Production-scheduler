"use client";
import { useState, useEffect } from "react";
import { table } from "../types/types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, PieShape, Cell
} from "recharts";
import Image from "next/image";

//interface types for useState containers
interface ChartData {
  timeRange: string;
  quantity: number;
}

//color specification for Pie chart data visualization
const chartColors = ["#610094", "#DA0037", "#84CC16"];

//main function for fetching the list of orders and building the recharts
export default function Recharts() {
        const [assemblyAData, setAssemblyAData] = useState<ChartData[]>([]);
        const [assemblyBData, setAssemblyBData] = useState<ChartData[]>([]);
        const [CNCData, setCNCData] = useState<ChartData[]>([]);
        const [totalQuantityA, settotalQuantityA] = useState<number>();
        const [totalQuantityB, settotalQuantityB] = useState<number>();
        const [totalQuantityCNC, settotalQuantityCNC] = useState<number>();
        
    const url = "https://production-scheduler-backend-server.onrender.com/orders"

//inside function to fetch list of orders from the db when page loads
    useEffect(() => {
      const fetchOrders = async () => {
        try {
            const response = await fetch(url, { cache: "force-cache" });
            const data: table[] = await response.json();
            //Assembly Line A
                const lineA = () => {
                    const lineAdata = data.filter((item) => item.machine === 'Assembly Line A')
                    const formattedlineAData = lineAdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity, 
                        }))
                    const totalQuantityA = lineAdata.reduce((accumulator, item) => {
                        return accumulator + item.quantity;
                    }, 0);
                        setAssemblyAData(formattedlineAData);
                        settotalQuantityA(totalQuantityA);
                }
                lineA();
            //Assembly Line B
                const lineB = () => {
                    const lineBdata = data.filter((item) => item.machine === 'Assembly Line B')
                    const formattedlineBData = lineBdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity,
                        }));
                    const totalQuantityB = lineBdata.reduce((accumulator, item) => {
                        return accumulator + item.quantity;
                    }, 0);
                        setAssemblyBData(formattedlineBData);
                        settotalQuantityB(totalQuantityB);
                }
                lineB();
            //CNC Machine
                const CNC = () => {
                    const CNCdata = data.filter((item) => item.machine === 'CNC Machine 1')
                    const formattedCNCData = CNCdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity,
                        }));
                    const totalQuantityCNC = CNCdata.reduce((accumulator, item) => {
                        return accumulator + item.quantity;
                    }, 0);
                        setCNCData(formattedCNCData);
                        settotalQuantityCNC(totalQuantityCNC)
                }
                CNC();

            } catch (err) {
                console.error(err);
            }
      };

      fetchOrders();
    }, []);

    //bring out the data for Pie chart 
    const PieData = [
        { machine: "Assembly Line A", value: totalQuantityA },
        { machine: "Assembly Line B", value: totalQuantityB },
        { machine: "CNC machine", value: totalQuantityCNC },
    ]
    return(
        <>
        <div className="flex flex-col md:flex-row w-full justify-center items-center m-auto flex-wrap">
        {/**Assembly Line A */}    
            <div className="h-fit w-4/5 md:w-1/3 m-auto">
                <h1 className="text-black mx-auto text-center my-3.5">ASSEMBLY LINE A</h1>
                <ResponsiveContainer  width="100%" height={300} className="m-auto">
                    <BarChart data={assemblyAData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timeRange" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#610094" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        {/**Assembly Line B */}
            <div className="h-fit w-4/5 md:w-1/3 mx-auto">
                <h1 className="text-black mx-auto text-center my-3.5">ASSEMBLY LINE B</h1>
                <ResponsiveContainer  width="100%" height={300}>
                <BarChart data={assemblyBData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#DA0037" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        {/**CNC Machine 1 */}
            <div className="h-fit w-4/5 md:w-1/3 mx-auto">
                <h1 className="text-black mx-auto text-center my-3.5">CNC MACHINE 1</h1>
                <ResponsiveContainer  width="100%" height={300}>
                <BarChart data={CNCData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#84CC16" />
                </BarChart>
            </ResponsiveContainer>
            </div>
{/**Pie Chart Data Visuals*/}
            <div className="mx-auto h-fit w-3/4 md:my-3 my-3.5 md:w-full">
                <h2 className="text-black mx-auto text-center">Total Quantity of Orders 
                    processed by each machine</h2>
                <PieChart width="100%" height={400}>
                    <Pie
                        data={PieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        nameKey="machine"
                        label
                    >
                        {PieData.map((entry, index) => (
                            <Cell key={index}
                            fill={chartColors[index % chartColors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
        </>
    )
}
