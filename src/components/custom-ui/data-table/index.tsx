'use client';

import React from 'react';
import {
  type ColumnDef,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createPaginatedRowModel,
  flexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  type RowData,
  type RowSelectionState,
  rowSortingFeature,
  type SortingState,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { DataTableEmpty } from './data-table-empty';

interface DataTableColumnMeta {
  sticky?: 'start' | 'end';
}

// v9 only exposes APIs for features registered here — keep in sync with what the table uses
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnSizingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnMeta: {} as DataTableColumnMeta,
});

type Features = typeof dataTableFeatures;

export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = ColumnDef<Features, TData, TValue>;

// Columns in one table hold different value types, so the array can't share a single TValue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyColumnDef<TData extends RowData> = DataTableColumnDef<TData, any>;

// ─── Types ───────────────────────────────────────────────────────────────────

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

interface DataTableProps<TData extends RowData> {
  columns: AnyColumnDef<TData>[];
  data: TData[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onRowSelectionChange?: (selectedRowIds: string[]) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getStickyColumnKeys<TData extends RowData>(
  columns: AnyColumnDef<TData>[],
  side: 'start' | 'end',
): string[] {
  return columns
    .filter((col) => col.meta?.sticky === side && 'accessorKey' in col)
    .map((col) => (col as { accessorKey: string }).accessorKey);
}

function createSelectionColumn<
  TData extends RowData,
>(): AnyColumnDef<TData> {
  return {
    id: 'select',
    size: 40,
    enableSorting: false,
    enableHiding: false,
    meta: { sticky: 'start' },
    header: ({ table }) => (
      <div className='flex items-center justify-center w-10'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center w-10'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
          aria-label='Select row'
        />
      </div>
    ),
  };
}

// ─── Sorting indicator ───────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: false | 'asc' | 'desc' }) {
  if (direction === 'asc') return <ChevronUpIcon className='size-3' />;
  if (direction === 'desc') return <ChevronDownIcon className='size-3' />;
  return <ChevronsUpDownIcon className='size-3' />;
}

// ─── Sticky cell style helper ────────────────────────────────────────────────

function getStickyStyle(
  sticky: 'start' | 'end' | undefined,
  column: {
    getStart: (side: 'start' | 'end' | 'center') => number;
    getAfter: (side: 'start' | 'end' | 'center') => number;
  },
  isHeader: boolean,
) {
  if (!sticky)
    return { style: { backgroundColor: 'var(--background)' }, className: '' };

  const isStart = sticky === 'start';
  return {
    style: {
      position: 'sticky' as const,
      insetInlineStart: isStart ? column.getStart('start') : undefined,
      insetInlineEnd: !isStart ? column.getAfter('end') : undefined,
      zIndex: isHeader ? 20 : isStart ? 10 : 11,
      backgroundColor: 'var(--background)',
    },
    className: isStart
      ? 'shadow-[1px_0_0_0_var(--border)]'
      : 'shadow-[-1px_0_0_0_var(--border)]',
  };
}

// ─── DataTable ───────────────────────────────────────────────────────────────

export function DataTable<TData extends RowData>({
  columns,
  data,
  pagination,
  onPageChange,
  onSortingChange: onSortingChangeProp,
  onRowSelectionChange: onRowSelectionChangeProp,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    {},
  );

  const hasSelection = !!onRowSelectionChangeProp;

  const selectionColumn = React.useMemo(
    () => createSelectionColumn<TData>(),
    [],
  );
  const finalColumns = React.useMemo(
    () => (hasSelection ? [selectionColumn, ...columns] : columns),
    [hasSelection, selectionColumn, columns],
  );

  const stickyStart = React.useMemo(
    () => getStickyColumnKeys(finalColumns, 'start'),
    [finalColumns],
  );
  const stickyEnd = React.useMemo(
    () => getStickyColumnKeys(finalColumns, 'end'),
    [finalColumns],
  );

  const pageCount = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : undefined;

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: finalColumns,
    pageCount,
    manualPagination: true,
    getRowId: (row) => (row as any).id,
    state: {
      sorting,
      pagination: {
        pageIndex: pagination?.page ?? 0,
        pageSize: pagination?.pageSize ?? 10,
      },
      rowSelection,
      columnPinning: { start: stickyStart, end: stickyEnd },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function' && pagination) {
        const next = updater({
          pageIndex: pagination.page,
          pageSize: pagination.pageSize,
        });
        onPageChange?.(next.pageIndex);
      }
    },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(next);
      onSortingChangeProp?.(next);
    },
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(next);
      onRowSelectionChangeProp?.(Object.keys(next));
    },
  });

  const selectedCount = table.getSelectedRowModel().rows.length;

  return (
    <div>
      <div className='border rounded-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table className='border-separate border-spacing-0 w-full table-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const { column } = header;
                    const sticky = column.columnDef.meta?.sticky;
                    const sortable = column.columnDef.enableSorting;
                    const isSelect = column.id === 'select';
                    const { style, className } = getStickyStyle(
                      sticky,
                      column,
                      true,
                    );

                    style.backgroundColor = 'var(--color-background)';

                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          ...style,
                          width: isSelect ? column.columnDef.size : 'auto',
                          paddingLeft: isSelect ? 0 : undefined,
                        }}
                        className={className}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              'flex items-center gap-2 py-1.5 text-muted-foreground',
                              sortable &&
                                'cursor-pointer select-none rounded-md px-2 hover:bg-muted',
                            )}
                            style={{
                              width: sortable
                                ? 'fit-content'
                                : (column.columnDef.size ?? 'auto'),
                            }}
                            onClick={
                              sortable
                                ? () => column.toggleSorting()
                                : undefined
                            }
                          >
                            {flexRender(
                              column.columnDef.header,
                              header.getContext(),
                            )}
                            {sortable && (
                              <SortIcon direction={column.getIsSorted()} />
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='group/row'
                  >
                    {row.getVisibleCells().map((cell) => {
                      const sticky = cell.column.columnDef.meta?.sticky;
                      const isSelect = cell.column.id === 'select';
                      const { style, className } = getStickyStyle(
                        sticky,
                        cell.column,
                        false,
                      );

                      if (row.getIsSelected()) {
                        style.backgroundColor = 'var(--color-card)';
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...style,
                            width: isSelect
                              ? cell.column.columnDef.size
                              : 'auto',
                            paddingLeft: isSelect ? 0 : undefined,
                          }}
                          className={cn('border-t', className)}
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
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between py-3 text-xs text-muted-foreground'>
        <span>
          {selectedCount} of {data.length} row(s) selected
        </span>
        <div className='flex items-center gap-1'>
          <Button
            size='icon-sm'
            variant='outline'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <span className='px-2 tabular-nums'>
            {pagination ? pagination.page + 1 : 1}
          </span>
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
