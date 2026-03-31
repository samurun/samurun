'use client';

import { DataTable } from '@/components/custom-ui/data-table';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import React from 'react';

interface Payment {
  id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  amount: number;
}

const data: Payment[] = [
  { id: '1', status: 'pending', email: 'john@example.com', amount: 100 },
  { id: '2', status: 'processing', email: 'jane@example.com', amount: 200 },
  { id: '3', status: 'success', email: 'bob@example.com', amount: 150 },
  { id: '4', status: 'failed', email: 'alice@example.com', amount: 300 },
  { id: '5', status: 'pending', email: 'charlie@example.com', amount: 75 },
  { id: '6', status: 'success', email: 'david@example.com', amount: 500 },
  { id: '7', status: 'processing', email: 'eve@example.com', amount: 250 },
  { id: '8', status: 'pending', email: 'frank@example.com', amount: 180 },
];

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    enableSorting: true,
    meta: {
      sticky: 'right',
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return formatted;
    },
  },
];

export function DataTableDemo() {
  const [pagination, setPagination] = React.useState({
    page: 0,
    pageSize: 5,
    total: data.length,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const paginatedData = React.useMemo(() => {
    const start = pagination.page * pagination.pageSize;
    return data.slice(start, start + pagination.pageSize);
  }, [pagination.page, pagination.pageSize]);

  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={paginatedData}
        pagination={pagination}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onRowSelectionChange={(selectedRowIds) => {
          setRowSelection(selectedRowIds);
        }}
        onSortingChange={(sorting) => setSorting(sorting)}
      />
    </div>
  );
}
