'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from 'lucide-react';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { DataTableEmpty } from './data-table-empty';

// Extend tanstack column meta for sticky support
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    sticky?: 'left' | 'right';
  }
}

interface Pagination {
  page: number; // 0-based index
  pageSize: number;
  total: number;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
}

// Helper to get sticky column keys
function getStickyColumns<TData>(
  columns: ColumnDef<TData, any>[],
  side: 'left' | 'right',
) {
  return columns
    .map((col) =>
      col.meta?.sticky === side && 'accessorKey' in col
        ? col.accessorKey
        : null,
    )
    .filter(Boolean) as string[];
}

// Checkbox column for row selection
function useSelectionColumn<TData>() {
  return React.useMemo<ColumnDef<TData>>(
    () => ({
      accessorKey: 'select',
      id: 'select',
      size: 40,
      header: ({ table }) => (
        <div className='flex items-center justify-center w-10 h-full'>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className='flex items-center justify-center w-10 h-full'>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
          />
        </div>
      ),
      meta: { sticky: 'left' },
      enableSorting: false,
      enableHiding: false,
    }),
    [],
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onSortingChange,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  // Memoize selection column to avoid unnecessary re-renders
  const selectionColumn = useSelectionColumn<TData>();
  const finalColumns = React.useMemo(
    () => (onRowSelectionChange ? [selectionColumn, ...columns] : columns),
    [onRowSelectionChange, selectionColumn, columns],
  );

  const stickyLeftColumns = React.useMemo(
    () => getStickyColumns(finalColumns, 'left'),
    [finalColumns],
  );
  const stickyRightColumns = React.useMemo(
    () => getStickyColumns(finalColumns, 'right'),
    [finalColumns],
  );

  const pageCount = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : -1;

  const table = useReactTable({
    data,
    columns: finalColumns,
    pageCount: pageCount > 0 ? pageCount : undefined,
    manualPagination: true,
    getRowId: (row: TData) => (row as any).id,
    state: {
      sorting,
      pagination: {
        pageIndex: pagination?.page ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
      rowSelection,
      columnPinning: {
        left: stickyLeftColumns,
        right: stickyRightColumns,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function' && pagination) {
        const nextState = updater({
          pageIndex: pagination.page,
          pageSize: pagination.pageSize,
        });
        onPageChange?.(nextState.pageIndex);
      }
    },
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(nextSorting);
      onSortingChange?.(nextSorting);
    },
    onRowSelectionChange: (updater) => {
      const nextRowSelection =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(nextRowSelection);
      const selectedRowIds = Object.keys(nextRowSelection).filter(
        (id) => nextRowSelection[id],
      );
      onRowSelectionChange?.(selectedRowIds);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='overflow-hidden'>
      <div className='rounded-md border scrollbar-thinF'>
        <Table className='border-separate border-spacing-0 w-full table-auto'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  const sticky = column.columnDef.meta?.sticky;
                  const isStickyLeft = sticky === 'left';
                  const isStickyRight = sticky === 'right';
                  const leftOffset = isStickyLeft
                    ? column.getStart('left')
                    : undefined;
                  const rightOffset = isStickyRight
                    ? column.getStart('right')
                    : undefined;
                  const isLastStickyLeft =
                    isStickyLeft &&
                    headerGroup.headers[header.index + 1]?.column.columnDef.meta
                      ?.sticky !== 'left';

                  const enabledSorting = header.column.columnDef.enableSorting;
                  const isSticky = isStickyLeft || isStickyRight;
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        position: isSticky ? 'sticky' : 'relative',
                        left: leftOffset ?? 0,
                        right: rightOffset ?? 0,
                        zIndex: isSticky ? 20 : 1,
                        backgroundColor: 'var(--background)',
                        paddingLeft: column.id === 'select' ? 0 : undefined,
                        width:
                          column.id === 'select'
                            ? column.columnDef.size
                            : 'auto',
                      }}
                      className={cn(
                        isLastStickyLeft && 'shadow-[1px_0_0_0_var(--border)]',
                        isStickyRight && 'shadow-[-1px_0_0_0_var(--border)]',
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          style={{
                            width: enabledSorting
                              ? 'fit-content'
                              : (column.columnDef.size ?? 32),
                            paddingLeft:
                              column.columnDef.id === 'select' ? 0 : undefined,
                          }}
                          className={cn(
                            'flex items-center gap-2 py-1.5 text-muted-foreground',
                            enabledSorting &&
                              'cursor-pointer hover:bg-muted select-none',
                            enabledSorting && 'px-2!',
                          )}
                          onClick={() =>
                            enabledSorting && header.column.toggleSorting()
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {enabledSorting &&
                            (header.column.getIsSorted() === 'asc' ? (
                              <ChevronUpIcon className='size-3' />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <ChevronDownIcon className='size-3' />
                            ) : (
                              <ChevronsUpDownIcon className='size-3' />
                            ))}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const sticky = cell.column.columnDef.meta?.sticky;
                    const isStickyLeft = sticky === 'left';
                    const isStickyRight = sticky === 'right';
                    const isSticky = isStickyLeft || isStickyRight;
                    const leftOffset = isStickyLeft
                      ? cell.column.getStart('left')
                      : undefined;
                    const rightOffset = isStickyRight
                      ? cell.column.getStart('right')
                      : undefined;

                    const selectColumn = cell.column.columnDef.id === 'select';
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          position: isSticky ? 'sticky' : 'relative',
                          left: leftOffset,
                          right: rightOffset,
                          zIndex: isStickyLeft ? 10 : isStickyRight ? 11 : 1,
                          backgroundColor: isSticky
                            ? 'var(--background)'
                            : 'transparent',
                          paddingLeft: selectColumn ? 0 : undefined,
                          width: selectColumn
                            ? (cell.column.columnDef.size ??
                              cell.column.columnDef.size)
                            : 'auto',
                        }}
                        className={cn(
                          'border-t',
                          isStickyLeft && 'shadow-[1px_0_0_0_var(--border)]',
                          isStickyRight && 'shadow-[-1px_0_0_0_var(--border)]',
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <DataTableEmpty columns={finalColumns} />
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-baseline py-2'>
        <p>
          {table?.getSelectedRowModel().rows.length} of {data.length} row(s)
          selected.
        </p>
        <div className='flex-1' />
        <div className='flex gap-1'>
          <Button
            size='icon-sm'
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button size='icon-sm' variant='ghost'>
            {pagination && `${pagination.page + 1}`}
          </Button>
          <Button
            size='icon-sm'
            variant='outline'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
