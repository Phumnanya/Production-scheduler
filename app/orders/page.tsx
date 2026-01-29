"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { table } from "../types/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

export default function Table() {
    //db_orders will get the list of orders from the db to display
    const [db_orders, setdb_orders] = useState<table[]>([]);
    const url = "http://127.0.0.1:5000/orders"

//fetch list of orders from the db when page loads
useEffect(() => {
  const fetchOrders = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        setdb_orders(data);
        console.log(data);
        console.log("DATA TYPE:", typeof data, data);
        } catch (err) {
            console.error(err);
        }
  };

  fetchOrders();
}, []);

    const columns = React.useMemo<ColumnDef<table>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "machine",
                header: "Machine",
            },
            {
                accessorKey: "task",
                header: "Task",
            },
            {
                accessorKey: "quantity",
                header: "Quantity",
            },
            {
                accessorKey: "startTime",
                header: "Start Time",
            },
            {
                accessorKey: "endTime",
                header: "End Time",
            },
            {
                accessorKey: "status",
                header: "Status",
            },
        ],
        []
    );
    //state for search, sorting, filtering
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([]);


    const tables = useReactTable({
        data: db_orders, columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
        globalFilter,
        sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
    });

    return(
        <div className="w-4/5 m-auto p-4">
            <h1 className="m-auto w-fit font-bold">Order Table</h1>
            {/* Search Bar*/}
            <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search Order"
                className="border px-3 py-2 rounded w-full md:w-1/3 bg-amber-200"
            />
            {/* Table */}
            <table className="w-full border-2 border-black">
                <thead className="bg-gray-100">
                    {tables.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="px-4 py-4 border cursor-pointer 
                            select-none" onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: " 🔼",
                                    desc: " 🔽",
                                }[header.column.getIsSorted() as string] ?? null}
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                {tables.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-6 border">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                <button
                onClick={() => tables.previousPage()}
                disabled={!tables.getCanPreviousPage()}
                className="px-3 py-1 border rounded bg-amber-200"
                >
                Previous
                </button>
                <span>
                Page{" "}
                <strong>
                    {tables.getState().pagination.pageIndex + 1} of{" "}
                    {tables.getPageCount()}
                </strong>
                </span>
                <button
                onClick={() => tables.nextPage()}
                disabled={!tables.getCanNextPage()}
                className="px-3 py-1 border rounded bg-amber-200"
                >
                Next
                </button>
            </div>
        </div>
    )
}

/*
 useEffect(() => {
        fetch("http://127.0.0.1:5000/orders")
        .then(res => res.json())
        .then(data => setdb_orders(data));
    }, []);
*/