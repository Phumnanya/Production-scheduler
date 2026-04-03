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
  createColumnHelper,
} from "@tanstack/react-table";

export default function Table() {
    //db_orders will get the list of orders from the db to display
    const [db_orders, setdb_orders] = useState<table[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const columnHelper = createColumnHelper<table>();
    const url = "https://production-scheduler-backend-server.onrender.com/orders"

//fetch list of orders from the db when page loads
useEffect(() => {
  const fetchOrders = async () => {
    try {
        const response = await fetch(url, { cache: "force-cache" });
        const data = await response.json();
        setdb_orders(data);
        setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
  };
  fetchOrders();
}, []);

const handleDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this order?")) {
    await fetch(`https://production-scheduler-backend-server.onrender.com/orders/${id}`, { method: 'DELETE' });
  }
};

    const columns = React.useMemo<ColumnDef<table>[]>(
        () => [
            columnHelper.display({
                id: "rowNumber",
                header: "S/N",
                cell: (info) => info.row.index + 1,
            }),
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
            columnHelper.display({
                id: "actions",
                cell: (props) => (
                <div className="flex gap-2">
                    <button 
                    onClick={() => handleDelete(props.row.original.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Delete
                    </button>
                </div>
                ),
            }),
        ],
        []
    );
//state for search, sorting, filtering
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [sorting, setSorting] = React.useState<SortingState>([]);
//initializing of the table
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
    if (isLoading) {
        return(
            <div className="fixed inset-0 bg-white flex flex-col justify-center 
            items-center z-50">
                <img src='/icons8-loading.gif' alt="Loading..." />
                <p className="mt-4 text-black font-semibold">Loading Dashboard...</p>
            </div>
        )
    }

    return(
        <div className="md:w-4/5 mx-auto md:my-20 my-5 w-full overflow-x-auto p-4">
            <h1 className="m-auto w-fit font-bold">Orders</h1>
            {/* Search Bar*/}
            <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search Order"
                className="border px-3 py-2 rounded w-full md:w-1/3 bg-amber-200"
            />
            {/* Table */}
            <table className="md:w-full min-w-max border-2 border-black">
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

/**
<button 
    onClick={() => handleEdit(props.row.original)}
    className="bg-blue-500 text-white px-2 py-1 rounded"
    >
    Edit
</button> 
*/
