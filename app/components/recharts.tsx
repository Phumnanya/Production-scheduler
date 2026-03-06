"use client";
import { useState, useEffect } from "react";
import { table } from "../types/types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface ChartData {
  timeRange: string;
  quantity: number;
  id: number;
}

export default function Recharts() {
        const [assemblyAData, setAssemblyAData] = useState<ChartData[]>([]);
        const [assemblyBData, setAssemblyBData] = useState<ChartData[]>([]);
        const [CNCData, setCNCData] = useState<ChartData[]>([]);
        const url = "http://127.0.0.1:5000/orders"

    //fetch list of orders from the db when page loads
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
                        id: item.id 
                        }))
                        setAssemblyAData(formattedlineAData);
                }
                lineA();
            //Assembly Line B
                const lineB = () => {
                    const lineBdata = data.filter((item) => item.machine === 'Assembly Line B')
                    const formattedlineBData = lineBdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity,
                        id: item.id 
                        }))
                        setAssemblyBData(formattedlineBData);
                }
                lineB();
            //CNC Machine
                const CNC = () => {
                    const CNCdata = data.filter((item) => item.machine === 'CNC Machine 1')
                    const formattedCNCData = CNCdata.map((item: table) => ({
                        timeRange: `${item.startTime} - ${item.endTime}`,
                        quantity: item.quantity,
                        id: item.id 
                        }))
                        setCNCData(formattedCNCData);
                }
                CNC();
            } catch (err) {
                console.error(err);
            }
      };

      fetchOrders();
    }, []);
    return(
        <div className="flex flex-col md:flex-row w-full justify-center items-center">
            <div className="mx-auto h-fit w-3/4">
                <h1 className="text-black mx-auto text-center my-3.5">ASSEMBLY LINE A</h1>
                <ResponsiveContainer  width="100%" height={300}>
                    <BarChart data={assemblyAData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timeRange" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
{/**Assembly Line B */}
            <div className="mx-auto h-fit w-3/4">
                <h1 className="text-black mx-auto text-center my-3.5">ASSEMBLY LINE B</h1>
                <ResponsiveContainer  width="100%" height={300}>
                <BarChart data={assemblyBData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            </div>
{/**CNC Machine 1 */}
            <div className="mx-auto h-fit w-3/4">
                <h1 className="text-black mx-auto text-center my-3.5">CNC MACHINE 1</h1>
                <ResponsiveContainer  width="100%" height={300}>
                <BarChart data={CNCData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeRange" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}


//console.log(data);
            //console.log("DATA TYPE:", typeof data, data);