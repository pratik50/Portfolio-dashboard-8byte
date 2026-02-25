import type { Stock } from '../types'
import { memo } from 'react'

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from '@tanstack/react-table'

interface Props {
    stocks: Stock[]
}

const PortfolioTable = memo(({ stocks }: Props) => {

    // Define columns 
    const columns: ColumnDef<Stock>[] = [
        {
            header: 'Stock',
            accessorKey: 'name',
        },
        {
            header: 'Buy Price',
            accessorKey: 'purchasePrice',
            // ₹ format mein dikhao
            cell: ({ getValue }) => `₹${(getValue() as number).toLocaleString('en-IN')}`,
        },
        {
            header: 'Qty',
            accessorKey: 'qty',
        },
        {
            header: 'Investment',
            accessorKey: 'investment',
            cell: ({ getValue }) => `₹${(getValue() as number).toLocaleString('en-IN')}`,
        },
        {
            header: 'Portfolio %',
            accessorKey: 'portfolioPercent',
            cell: ({ getValue }) => `${(getValue() as number).toFixed(2)}%`,
        },
        {
            header: 'CMP',
            accessorKey: 'cmp',
            // CMP null show "—" 
            cell: ({ getValue }) => {
                const val = getValue() as number | null
                return val ? `₹${val.toLocaleString('en-IN')}` : '—'
            },
        },
        {
            header: 'Present Value',
            accessorKey: 'presentValue',
            cell: ({ getValue }) => {
                const val = getValue() as number | null
                return val ? `₹${val.toLocaleString('en-IN')}` : '—'
            },
        },
        {
            header: 'Gain/Loss',
            accessorKey: 'gainLoss',
            // Gain green, Loss red
            cell: ({ getValue, row }) => {
                const val = getValue() as number | null
                if (!val) return '—'
                const isProfit = val >= 0
                const percent = row.original.gainLossPercent?.toFixed(2)
                return (
                    <span className={isProfit ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {isProfit ? '+' : ''}₹{val.toLocaleString('en-IN')}
                        <span className="text-xs ml-1">({isProfit ? '+' : ''}{percent}%)</span>
                    </span>
                )
            },
        },
        {
            header: 'P/E',
            accessorKey: 'pe',
            cell: ({ getValue }) => {
                const val = getValue() as number | null
                return val ? val.toFixed(2) : '—'
            },
        },
        {
            header: 'EPS',
            accessorKey: 'eps',
            cell: ({ getValue }) => {
                const val = getValue() as number | null
                return val ? val.toFixed(2) : '—'
            },
        },
        {
            header: 'NSE/BSE',
            accessorKey: 'exchange',
        },
    ]

    // react-table setup
    const table = useReactTable({
        data: stocks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">

                {/*Header*/}
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="bg-gray-50 text-gray-500 text-left">
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-4 py-3 font-medium whitespace-nowrap">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {/* Rows */}
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
})


export default PortfolioTable
